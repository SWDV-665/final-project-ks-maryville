import {Component, OnInit} from '@angular/core';
import {Contacts} from "@capacitor-community/contacts";
import {calendarNumber} from "ionicons/icons";
import {ToastController} from "@ionic/angular";


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


    contacts: any[] = [];

    constructor(public toastCtrl: ToastController) {
    }


    loadContacts = () => {
        return this.contacts
    }
    retrieveListOfContacts = async () => {
        const projection = {
            name: true,
            phones: true,
            postalAddresses: true,
            emails: true
        }
        const result = await Contacts.getContacts({
            projection,
        })
        this.contacts = result.contacts;
    }

    async getContacts() {
        try {
            const permissions = await Contacts.requestPermissions();
            if (!permissions?.contacts) return;
            if (permissions?.contacts === 'granted') {
                this.retrieveListOfContacts();
            }
        } catch (err) {
            console.log(err);
        }
    }

    async pickContact() {
        const contact = await Contacts.pickContact({
                projection: {
                    name: true,
                    phones: true,
                    postalAddresses: true,
                    emails: true,

                },
            })

        ;
        // const id = contact["contactId"];
        if (!JSON.stringify(this.contacts).includes(JSON.stringify(contact["contact"]["contactId"]))) {
            this.contacts.push(contact["contact"]);
        } else {
            const toast = await this.toastCtrl.create({
                message: "Contact already exists",
                duration: 3000
            })

            toast.present();

            console.log("this contact already exists");
        }
        console.log((JSON.stringify(this.contacts)))
    }

    removeContact = (index: number) => {
        this.contacts.splice(index, 1)
    }

    ngOnInit() {
        // this.getContacts();
    }
}
