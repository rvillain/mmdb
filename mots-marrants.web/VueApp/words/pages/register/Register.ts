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
    errors: Array<any> = []
    passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/
    passTip = "Le mot de passe doit contenir 1 majuscule, 1 caractère spécial, 1 chiffre et doit contenir au minimum 6 caractères"


    getError(code: string){
        switch(code){
            case "DuplicateUserName":
                return "Nom d'utilisateur déjà pris"
            default: 
                return ""
        }
    }
    created() {
    }
    checkForm(e: any) {
        this.isLoading = true;
        this.errors = [];
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
                Notification.success(this, "Vous êtes connecté");
            }).catch(errors => {
                console.log(errors);
                this.errors = errors;
                Notification.error(this,"Erreur lors de la création du compte");
                this.isLoading = false;
            })

            return false;
        }
  
  
        if (!this.username) {
          this.errors.push('Le login est requis.');
        }
        if (!this.password) {
          this.errors.push('Le mot de pasee est requis');
        }
  
        e.preventDefault();
        
        this.isLoading = false;
    }
}