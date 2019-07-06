import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { Notification } from "@/common/services/notificationService";
import { WordData } from '@/words/types/models/wordData';

@Component({
    name: 'Admin',
    computed: {
        ...mapGetters(['admin'])
    }
})
export default class Admin extends Vue {

    words: Array<WordData> = [];

    created() {
       this.fetchWordData()
    }

    fetchWordData(): void {
        this.$store.dispatch('getForAdmin')
        .then(result => {
            this.words = result;
        }).catch(error => {
            console.log(error);
        })
    }

    save(wordData: WordData){
        wordData.validated = true;
        wordData.validationDate = new Date();
        this.$store.dispatch('update', wordData)
            .then(result => {
                Notification.success(this, 'OK')
                this.fetchWordData()})
            .catch(error => {
                console.log(error)
            })
    }
    remove(wordData: WordData){
        this.$store.dispatch('delete', wordData.id)
            .then(result => {
                Notification.success(this, 'OK')
                this.fetchWordData()})
            .catch(error => {
                console.log(error)
            })
    }
}