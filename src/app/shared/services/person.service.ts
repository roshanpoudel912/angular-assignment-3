import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Person } from '../models/person';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  // private personsUrl = 'api/persons/person'; // URL to web api
  private personsUrl = "https://localhost:7007/api/Person/person";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET persons from the server */
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl).pipe(
      tap((_) => this.log('fetched persons')),
      catchError(this.handleError<Person[]>('getPersons', []))
    );
  }

  /** DELETE: delete the person from the server */
  deletePerson(id: number): Observable<Person> {
    const url = `${this.personsUrl}/${id}`;

    return this.http.delete<Person>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  /** POST: add a new person to the server */
  addPerson(person: Person): Observable<Person> {
    return this.http
      .post<Person>(this.personsUrl, person, this.httpOptions)
      .pipe(
        tap((newPerson: Person) =>
          this.log(`added person w/ id=${newPerson.personId}`)
        ),
        catchError(this.handleError<Person>('addPerson'))
      );
  }

 

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PersonService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PersonService: ${message}`);
  }
}
