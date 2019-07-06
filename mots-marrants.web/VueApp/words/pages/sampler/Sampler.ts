import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { UserVM } from '@/words/types/models/userVM';
import { Notification } from "@/common/services/notificationService";

@Component({
    name: 'Sampler',
    computed: {
        ...mapGetters(['sampler'])
    }
})
export default class Sampler extends Vue {

    words: Array<string> = [];

    created() {
        this.fetchWordData()
    }

    speek(word: string){
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.text = word;
        speechSynthesis.speak(msg);
    }

    fetchWordData(): void {

        this.$store.dispatch('getSampler')
            .then(result => {
                this.words = result;
            }).catch(error => {
                console.log(error);
            })

    }

    remove(index: number){
        this.words.splice(index, 1);
        let str = this.words.toString();
        this.$store.dispatch('saveSampler',{
            sampler: str
        } )
            .then(result => {
            }).catch(error => {
                console.log(error);
            });
    }
}