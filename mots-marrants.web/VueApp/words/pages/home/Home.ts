
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { Notification } from "@/common/services/notificationService";
import { WordData } from '@/words/types/models/wordData';
import { WordRate } from '@/words/types/models/wordRate';
import { SearchVM } from '@/words/types/models/searchVM';
import { StorageService } from '@/words/services/storage.service';

declare var TextToSpeech:any;

@Component({
    name: 'Home',
    computed: {
        ...mapGetters(['home'])
    }
})
export default class Home extends Vue {

    
    words: WordData[] = [];
    currentWord: WordData = { word: ""};
    get filteredWords(): WordData[] {
        return this.words.filter(w=>w.word.toLowerCase().indexOf(this.search.toLowerCase())>-1);
    }
    search: string = "";
    isLoading: boolean = false;
    showModal: boolean = false;
    isAuthenticated = false;

    //add word
    showAddModal = false;
    wordType = "";
    tag="";


    created() {
        this.fetchWordData({
            search : "",
            rate : 0,
            wordTypes : []});
        this.isAuthenticated = StorageService.isAuthenticated();
    }

    get isNewWord(): boolean{
        return !this.isLoading && this.words.filter(w=>w.word.toLowerCase() == this.search.toLowerCase()).length == 0 && this.search != null && this.search.length > 0 && this.search.indexOf(" ") == -1;
    }
    
    fetchWordData(searchVm: SearchVM): void {
        this.isLoading = true;

        this.$store.dispatch('search', searchVm)
            .then(result => {
                this.isLoading = false;
                this.words = result;
            }).catch(error => {
                this.isLoading = false;
            })

    }

    openAddModal(){
        this.wordType = "";
        this.currentWord = {
            word: this.search
        }
        this.showAddModal = true;
    }
    wordValid(){
        return this.wordType.length > 0;
    }
    addTag(){
        if((!this.currentWord.tags || this.currentWord.tags.indexOf(this.tag) == -1) && this.tag){
            if(!this.currentWord.tags || this.currentWord.tags.length == 0){
                this.currentWord.tags = this.tag;
            }
            else{
                this.currentWord.tags += "," + this.tag;
            }
            this.tag="";
        }
    }
    onAdd(){
        this.showAddModal = false;
        this.$store.dispatch('add', this.currentWord)
            .then(result => {
                this.isLoading = false;
                Notification.success(this, 'Merci pour l\'ajout')
                this.search = "";
                this.fetchWordData({
                    search : "",
                    rate : 0,
                    wordTypes : []});
            }).catch(error => {
                this.isLoading = false;
            })
    }

    vote(word: WordData, rate: number){
        let wr :  WordRate = {
            wordDataId: word.id as number,
            rate: rate
        }
        this.showModal = false;
        this.$store.dispatch('rate', wr)
            .then(result => {
                Notification.success(this, 'Merci d\'avoir voté!');
                this.isLoading = false;
                word.rate = result.rate;
                word.rateCount = result.rateCount;
                let votes = localStorage.getItem('votes');
                if(!votes || votes.length == 0){
                    votes = (word.id as number).toString();
                }
                else{
                    votes += ',' + (word.id as number).toString();
                }
                localStorage.setItem('votes',votes);
            }).catch(error => {
                this.isLoading = false;
            })
    }

    speek(word: WordData){
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.text = word.word;
        speechSynthesis.speak(msg);
    }

    sort(property: string, descending: boolean){
        let numValue = descending ? 1 : -1;

        this.words = this.words.sort((a,b)=> 
        a[property] < b[property] ? 
        numValue : 
        (a[property] == b[property] ? ((a.rateCount as number) < (b.rateCount as number) ? numValue : -numValue) : -numValue));
    }

    canVote(word: WordData){
        let votes = localStorage.getItem('votes');
        if(votes && votes.length > 0){
            return votes.split(',').indexOf((word.id as number).toString()) == -1;
        }
        return true;
    }

    openModal(word: WordData){
        this.currentWord = word;
        this.showModal = true;
    }

    addToSampler(word: WordData){
        this.$store.dispatch('addToSampler', word)
            .then(result => {
                Notification.success(this, 'Mot ajouté au sampler!');
            }).catch(error => {
                this.isLoading = false;
            })
    }
}