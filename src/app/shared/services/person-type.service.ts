import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { PersonType } from '../models/person-type';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PersonTypeService {

  // private personTypesUrl = 'api/personTypes';  // URL to web api
  private personTypesUrl = "https://localhost:7007/api/PersonType/persontype";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  constructor(private http: HttpClient, private messageService: MessageService) { }

   /** GET persons from the server */
   getPersonTypes(): Observable<PersonType[]> {
    return this.http.get<PersonType[]>(this.personTypesUrl)
      .pipe(
        tap(_ => this.log('fetched persons')),
        catchError(this.handleError<PersonType[]>('getPersonTypes', []))
      );
  }

  /** GET person type by id. Will 404 if id not found */
  getPersonType(id: number): Observable<PersonType> {
    const url = `${this.personTypesUrl}/${id}`;
    return this.http.get<PersonType>(url).pipe(
      tap(_ => this.log(`fetched person type id=${id}`)),
      catchError(this.handleError<PersonType>(`getPersonType id=${id}`))
    );
  }

  /** PUT: update the person type on the server */
  // updatePersonType(personType: PersonType): Observable<any> {
  //   return this.http.put(this.personTypesUrl, personType, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated person type id=${personType.personTypeId}`)),
  //     catchError(this.handleError<any>('updatePersonType'))
  //   );
  // }

  updatePersonType(personType: PersonType): Observable<any> {
    return this.http.put(this.personTypesUrl+`/${personType.personTypeId}`, personType, this.httpOptions).pipe(
      tap(_ => this.log(`updated person type id=${personType.personTypeId}`)),
      catchError(this.handleError<any>('updatePersonType'))
    );
  }

   /** DELETE: delete the person type from the server */
   deletePersonType(id: number): Observable<PersonType> {
    const url = `${this.personTypesUrl}/${id}`;

    return this.http.delete<PersonType>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted person type id=${id}`)),
      catchError(this.handleError<PersonType>('deletePersonType'))
    );
  }

  /** POST: add a new person type to the server */
  addPersonType(personType: PersonType): Observable<PersonType> {
    return this.http
      .post<PersonType>(this.personTypesUrl, personType, this.httpOptions)
      .pipe(
        tap((newPersonType: PersonType) =>
          this.log(`added person type w/ id=${newPersonType.personTypeId}`)
        ),
        catchError(this.handleError<PersonType>('addPersonType'))
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
    this.messageService.add(`PersonTypeService: ${message}`);
  }

}
