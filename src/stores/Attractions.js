import {observable, action, computed} from 'mobx'

class Attractions {
    @observable _attractions = {
        venue: [],
        dj: [],
        photographer: [],
        general: []
    }
    @computed get attractions() {
        return this._attractions
    }
}

export const attractions = new Attractions()