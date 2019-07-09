
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

    storage = StorageService;
    words: WordData[] = [];
    currentWord: WordData = { word: ""};

    get filteredWords(): WordData[] {
        let activeTags = this.allTags.filter(t=>this.disabledTags.indexOf(t) == -1);
        return this.words.filter(w=>
            w.word.toLowerCase().indexOf(this.search.toLowerCase())>-1
            &&  
            (this.disabledTags.length == 0 || w.tags && w.tags.split(',').filter(t=>activeTags.indexOf(t) > -1).length > 0)
            );
    }

    search: string = "";
    isLoading: boolean = false;
    showModal: boolean = false;
    showFilters: boolean = false;
    isAuthenticated = false;

    //add word
    showAddModal = false;
    wordType = "";
    tags: Array<string> = [];
    allTags: Array<string> = []

    //filters
    disabledTags: Array<string> = [];


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
                this.words = result;
                this.shuffle();
                this.isLoading = false;
                let arrTags = this.words.map(w=>w.tags?w.tags.split(','): []).flat();
                this.allTags = Array.from(new Set(arrTags.map((item: any) => item)));
            }).catch(error => {
                this.isLoading = false;
            })

    }

    openAddModal(){
        this.wordType = "";
        this.tags = [];
        this.currentWord = {
            word: this.search
        }
        this.showAddModal = true;
    }
    wordValid(){
        return this.wordType.length > 0;
    }
    onAdd(){
        this.showAddModal = false;
        this.currentWord.tags = this.wordType;
        this.tags.forEach(t=> this.currentWord.tags += ("," + t ));
        this.$store.dispatch('add', this.currentWord)
            .then(result => {
                this.isLoading = false;
                Notification.success(this, 'Merci pour l\'ajout. Votre mot sera dispo une fois que l\'équipe de modération aura fait sa besogne')
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

    shuffle(){
        var copy = JSON.parse(JSON.stringify(this.words));
        var currentIndex = copy.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = copy[currentIndex];
          copy[currentIndex] = copy[randomIndex];
          copy[randomIndex] = temporaryValue;
        }
        this.words = copy;
    }

    toggleTag(tag: string){
        let index = this.disabledTags.indexOf(tag);
        if(index == -1){
            this.disabledTags.push(tag);
        }
        else{
            this.disabledTags.splice(index, 1);
        }
    }
}