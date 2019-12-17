import {observable, action, computed} from 'mobx'

class User {
    @observable userInfo = []
    @observable closedAttractions = []
}

export const user = new User()