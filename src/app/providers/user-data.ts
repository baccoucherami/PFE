import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';
import { Utilisateur } from '../Models/Utilisateur';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  role = new Subject<string>();
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';


  utilisateurs:Utilisateur[]=[
      new Utilisateur("client1","client1123","client"),
      new Utilisateur("client2","client2123","client"),
      new Utilisateur("agent","agent123","agent")
  ]



  constructor(
    public storage: Storage,
    private router: Router
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(username: string,password: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      const usersFiltred:Utilisateur[] =this.utilisateurs.slice().filter((user)=>{
        return ((user.login == username)&&(user.password == password))
      });
      if(usersFiltred.length>0){
        this.setUsername(username);
        this.setRole(usersFiltred[0].role);
        this.role.next(usersFiltred[0].role);
        this.router.navigateByUrl('/app/tabs/map');
        return window.dispatchEvent(new CustomEvent('user:login'));
      }else{
        return null
      }
    });
  }
  setRole(role: string) {
    return this.storage.set('role', role);
  }

  signup(username: string,password: string,role: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      const user = new Utilisateur(username,password,role);
      this.utilisateurs.push(user);
      this.setUsername(username);
      this.role.next(role);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
      this.router.navigateByUrl('login');
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }
  getRole(): Promise<string> {
    return this.storage.get('role').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
