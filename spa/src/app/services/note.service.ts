import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Note} from "../model/note";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for note related CRUD operations in the backend
 */
export class NoteService {

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves all notes from the backend
   */
  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(environment.apiUrl + '/Note');
  }

  /**
   * deletes a note in the backend
   * @param uuid uuid of the note
   */
  delete(uuid: string): Observable<Object> {
    return this.http.delete(environment.apiUrl + '/Note/' + uuid);
  }

  /**
   * creates or updates a note in the backend
   * @param note
   */
  createOrUpdate(note: Note): Observable<Note> {
    return this.http.post<Note>(environment.apiUrl + '/Note', note);
  }

}
