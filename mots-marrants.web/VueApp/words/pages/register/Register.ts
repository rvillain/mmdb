import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { Notification } from "@/common/services/notificationService";
import { UserVM } from '@/words/types/models/userVM';
import { router } from '@/words/router/router';

@Component({
    name: 'Register',
    computed: {
        ...mapGetters(['register'])
    }
})
export default class Register extends Vue {
    username: string = ""
    password: string = ""
    confirmPassword: string = ""

    isLoading = false;
    errors: Array<string> = []



    created() {
    }
    checkForm(e: any) {
        if (this.username && this.password && this.password == this.confirmPassword) {
            let userVM: UserVM = {
                login: this.username,
                password: this.password
            }
            e.preventDefault();
            this.$store.dispatch('register', userVM)
            .then(result => {
                localStorage.setItem('user', JSON.stringify(result));
                router.push('/');
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
            })

            return false;
        }
  
        this.errors = [];
  
        if (!this.username) {
          this.errors.push('Le login est requis.');
        }
        if (!this.password) {
          this.errors.push('Le mot de pasee est requis');
        }
  
        e.preventDefault();
    }
}