import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact, ContactService } from '../contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact | null = null;
  @Output() formSubmit = new EventEmitter<void>();
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contactData = { ...this.contact, ...this.contactForm.value };
      this.contactService.saveContact(contactData);
      this.formSubmit.emit();
      this.showSuccessMessage();
    }
  }

  showSuccessMessage(): void {
    Swal.fire({
      title: 'Success',
      text: 'Data saved successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
