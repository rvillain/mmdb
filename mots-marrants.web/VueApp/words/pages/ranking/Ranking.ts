import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { Notification } from "@/common/services/notificationService";

@Component({
    name: 'Ranking',
    computed: {
        ...mapGetters(['ranking'])
    }
})
export default class Ranking extends Vue {

    wordId: number = 583

    created() {
        this.fetchWordData()
    }

    fetchWordData(): void {

        this.$store.dispatch('getWordById', this.wordId)
            .then(result => {

                Notification.success(this, 'Data fetched successfully!')

            }).catch(error => {

                Notification.error(this, 'Error fetching data!')

            })

    }
}