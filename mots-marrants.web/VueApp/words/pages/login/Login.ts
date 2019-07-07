import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { UserVM } from '@/words/types/models/userVM';

import { Notification } from "@/common/services/notificationService";
import { router } from '@/words/router/router';

@Component({
    name: 'Login',
    computed: {
        ...mapGetters(['login'])
    }
})
export default class Login extends Vue {
    username: string = ""
    password: string = ""
    errors: Array<string> = []
    isLoading = false

    created() {
    }
    checkForm(e: any) {
        if (this.username && this.password) {
            let userVM: UserVM = {
                login: this.username,
                password: this.password
            }
            e.preventDefault();
            this.$store.dispatch('login', userVM)
            .then(result => {
                this.isLoading = false;
                localStorage.setItem('user',JSON.stringify(result));
                router.push('/');
            }).catch(error => {
                console.log(error);
                Notification.error(this, "Identifiants incorrects");
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