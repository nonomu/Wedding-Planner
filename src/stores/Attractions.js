import { observable, action, computed } from 'mobx'

class Attractions {
    @observable _attractions = {
        venue: [{
            category: "venue",
            attr_name: "Nof-jerusalem",
            attr_vendor: "Yaniv",
            image: "http://nofyerushalaim.com/wp-content/uploads/pb070021-Custom-resized1.jpg",
            location: "shahrai 2 jerusalem",
            rating: 3, contact_name: "Shaul",
            contact_phone: 02 - 6415999,
            contact_email: "yaniv@gmail.com",
            small_prints: "Lots of bugs :)"
        }, {
                category: "venue",
                attr_name: "Nof-jerusalem",
                attr_vendor: "Yaniv",
                image: "http://nofyerushalaim.com/wp-content/uploads/pb070021-Custom-resized1.jpg",
                location: "shahrai 2 jerusalem",
                rating: 3, contact_name: "Shaul",
                contact_phone: 02 - 6415999,
                contact_email: "yaniv@gmail.com",
                small_prints: "Lots of bugs :)"
            }],
        dj: [],
        photographer: [],
        general: []
    }
    @computed get attractions() {
        return this._attractions
    }
}

export const attractions = new Attractions()