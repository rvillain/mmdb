
class StorageServiceProvider{
    constructor(){

    }
    getUser(){
        let u = localStorage.getItem('user')
        if(u){
            return  JSON.parse(u);
        }
        return null;
    }

    isAuthenticated(){
        var user = this.getUser();
        return user && user.token;
    }
    isAdmin(){
        var user = this.getUser();
        return user && user.token && user.role == 'Admin';
    }
    logout(){
        localStorage.removeItem('user');
    }
}
export const StorageService = new StorageServiceProvider()