import {observable, action, computed} from 'mobx'

class User {
    
    
    @observable userInfo = []
    @observable closedAttractions = []

    @action login
}

export const user = new User()