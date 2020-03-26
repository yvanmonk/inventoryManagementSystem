import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Customer {
    Name: string;
    firstName: string;
    Phone: string;
    Poste:string;
    Role:string;
    City: string;
    Address: string;
    Email: string;
    Password: string;
}
let roles: string[] =[
    'Admin', 'Staff', 'User'
];

let cities: string[] = [
    "Buea", "Yaoundé", "Maroua", "Ngaroundéré", "Garoua", "Nkongsamba", "Kribi", "Ebolowa", "Bertoua", "Edéa", "Foumban", "Dschang", "Bafang", "Kumba", "Banganté", "Mbalmayo", "Bafia", "Tiko", "Sangmélima", "Batouri", "Bandjoun", "Abong Mbang", "Kousséri", "Mbouda", "Loum", "Yokadoum", "Mamfé", "Meigagan", "Guider", "Foumbot", "Mbanga", "Wum", "Fundong", "Bali", "Benoue", "Mora", "Yabassi", "Tibati", "Nkam", "Diamaré", "Garoua Boulaï", "Mokolo", "Banyo", "Nanga Eboko", "Eséka", "Wouri", "Kaélé", "Bamenda", "Baganté", "Bafoussam", "Douala"];

export class RegisterService {
    getCities() {
        return cities;
    }
    getRoles() {
      return roles;
    }
}
