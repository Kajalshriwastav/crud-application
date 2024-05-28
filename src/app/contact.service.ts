import { Injectable } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private localStorageKey = 'contacts';

  constructor() { }

  getContacts(): Contact[] {
    const contacts = localStorage.getItem(this.localStorageKey);
    return contacts ? JSON.parse(contacts) : [];
  }

  saveContact(contact: Contact): void {
    const contacts = this.getContacts();
    if (contact.id) {
      const index = contacts.findIndex(c => c.id === contact.id);
      if (index !== -1) {
        contacts[index] = contact;
      }
    } else {
      contact.id = this.generateId();
      contacts.push(contact);
    }
    this.updateLocalStorage(contacts);
  }

  deleteContact(id: number): void {
    let contacts = this.getContacts();
    contacts = contacts.filter(c => c.id !== id);
    this.updateLocalStorage(contacts);
  }

  private generateId(): number {
    const contacts = this.getContacts();
    return contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
  }

  private updateLocalStorage(contacts: Contact[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
  }
}
