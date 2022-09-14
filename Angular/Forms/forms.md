# Forms Angular (Template && Reactive)

## Template Form

```ts
export class basicComponent {
  @ViewChild("local reference") Form!: ngForm;

  validateFirst() {
    return (
      this.Form?.controls["Games"]?.invalid &&
      this.Form?.controls["Games"].touched
    );
  }

  validateSecond() {
    return (
      this.Form?.controls["Price"]?.value < 0 &&
      this.Form?.controls["Price"].touched
    );
  }
  saveData() {
    console.log(this.Form);
  }
}

//basic.component.html
/*
<h1>Basics</h1>
<hr>
<div class="row">
    <div class="col">
        <form (ngSubmit)="getValues()" #formSubmit="ngForm" //With this you are acceding to the forms and its actions>
            <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Games</label>
                <div class="col-sm-9">
                    <input type="text" 
                            ngModel //This is important if you want to save data
                            name="Games" //This is like an id to the inputs 
                           class="form-control"
                           placeholder="Game name"
                           required
                    />
                    <span class="form-text text-danger" *ngIf="validateFirst()">You must fill this field </span>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Price</label>
                <div class="col-sm-9">
                    <input type="number" 
                            ngModel
                            name="Price"
                           class="form-control"
                           placeholder="Price of the game"
                           required
                    />
                      <span class="form-text text-danger" *ngIf="validateSecond()">You must fill this field with a higher number </span>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Stock</label>
                <div class="col-sm-9">
                    <input type="number"
                           ngModel
                           name="Stock" 
                           class="form-control"
                           placeholder="Game Stock"
                           required
                    />
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <button type="submit"
                    [disabled]='formSubmit.invalid' //if the form is valid is going to enanle the button
                            class="btn btn-primary float-end pr-4 pl-3"
                    >Save</button>
                </div>
            </div>
        </form>
        <h1>Valid</h1>
        <pre>
            {{formSubmit.valid}} //Is going to be valid is all the fields are fill.
        </pre>
        <h1>Values</h1>
        <pre>{{formSubmit.value | json}}</pre>
    </div>
</div>
*/

//The problem with the template form is when you are going to valid it , you can put required but the problem is with the numbers inputs.
```

> Template you are going to valid it with just html tags.

> Forms by template are does that all the logic are in the html part.

> Reactive Forms are does that all the logic are in the ts part and a few part are in the html part.

> pristine are the value that the form have by default. (ngForm)

> With viewChild is more izi the job with template Forms.

# Custom Directive

```ts
//customMin.directive.ts
import { Directive, Input } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from "@angular/forms";

@Directive({
  //With this Angular know , this is a directive
  selector: "[customMin][ngModel]", //This is the name and the NgModel
  providers: [
    {
      provide: NG_VALIDATORS, //Angular Validators
      useExisting: CustomMin, //Name of the Directive(Class)
      multi: true, //Just to solve some errors
    },
  ],
})
export class CustomMin implements Validator {
  @Input() minimo!: Number; //Ask for the min value

  constructor() {}

  validate(control: FormControl /*Using the forms controls*/) {
    const inputValue = control.value; //Getting the value
    return inputValue < this.minimo ? { CustomMin: true } : null; //Have to return a true or a null
  }
}

//basics.component.html

/*
  <div class="col-sm-9">
                    <input type="number"
                           ngModel
                           name="Stock" 
                           class="form-control"
                           placeholder="Game Stock"
                           customMin //Using the Direcive
                           [minimo]="0" //Giving the min value 
                           required
                    />
                </div>
                 <h1>Custom Directive</h1>
        <pre>{{formSubmit.controls['Stock']?.errors | json}}</pre> //Result of the directive
*/
```

> the .directive is important for the developer to know that is a directive

> You have to import it in the module , that you are using it.

> The name have to be diferent from the html tags.

# Cleaning the Basic Form

```ts
//Just using the view child
export class basicComponet {
  @ViewChild("local reference") Form!: NgForm;
  initForm = {
    name: "Sebastian",
    age: 84,
  };

  setValue() {
    console.log(this.Form);
    this.Form.resetForm(); //Just delete all the info when you send the form
    /*
        this.Form.resetForm({
            name:'Juanito', //Reset Parameters 
            age:34
        })
        */
  }
}

/*
basic.component.html
 <div class="col-sm-9">
                    <input type="text" 
                            [ngModel]="initForm.name" //With this the default paramters are those who are in the initForm
                            name="Games"
                           class="form-control"
                           placeholder="Game name"
                           minlength="3"
                           required
                    />
                    <span class="form-text text-danger" *ngIf="validateFirst()">
                    You must fill this field </span>
                </div>
*/
```

> This is just showing how to reset and put default paramters in a form with template.

# Template Validating (Checkbox,Swicthes and Radio Buttons)

> in the case of the checkboxes just put a value in the checkbox and use the ngModel and a object to change the value.

> in the case of the swicthes just make a property type boolean and use the ngModel ([ngModel]) to change it.

> in the case of the radio buttons just make the same as the switches.

> To get the value is the same as the other examples.

# Reactive Forms

```ts
//app.component.ts
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms"; //Have to import it to work with it

@Component({
  selector: "app-basics",
  templateUrl: "./basics.component.html",
  styles: [],
})
export class BasicsComponent {
  formSubmit: FormGroup = new FormGroup({
    //With this you are declaring the values of the forms
    name: new FormControl(""), //you can use this without a value [new FormControl()]
  });
  constructor() {}
}

/*
//app.component.html
  <form autocomplete="off" [formGroup]="formSubmit" //declaring the form to use>
            <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Games</label>
                <div class="col-sm-9">
                    <input type="text" 
                            name="Games"
                            formControlName="name" //using the values of the formGroup (important to recognize that input is from the form)
                           class="form-control"
                           placeholder="Game name"
                    />
                    <span class="form-text text-danger">
                    You must fill this field </span>
                </div>
            </div>
</form>

*/
```

> You have to import ReactiveFormsModule (in the module that is going to use it).

> Is recommend to just import one (ReactiveFormsModule or FormsModule)

# Form Builder

```ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms"; //Have to import it

@Component({
  selector: "app-basics",
  templateUrl: "./basics.component.html",
  styles: [],
})
export class BasicsComponent {
  // formSubmit: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   stocks: new FormControl(),
  // });

  constructor(private fb: FormBuilder) {} //Have to use it in the constructor

  formSubmit: FormGroup = this.fb.group({
    //This is more efficently that the other way
    name: [""], //This is the FormControl
    price: [0],
    stocks: [],
  });
}
```

# Forms Validator (Basic)

```ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms"; //Have to import it

@Component({
  selector: "app-basics",
  templateUrl: "./basics.component.html",
  styles: [],
})
export class BasicsComponent implements OnInit {
  // formSubmit: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   stocks: new FormControl(),
  // });

  constructor(private fb: FormBuilder) {} //Have to use it in the constructor

  ngOnInit(): void {
    //With this the form is going to have values by default
    this.formSubmit.setValue({
      //You can put reset do it when you reset the form
      name: "Hello World",
      price: 1500,
      stocks: 1,
    });
  }

  formSubmit: FormGroup = this.fb.group({
    //This is more efficently that the other way
    name: ["", [Validators.required, Validators.minLength(3)]], //This is the FormControl
    price: [0, [Validators.required, Validators.min(0)]],
    /*
    required = required (input)
    minLength = minLength of the input
    min = min number of the input
    */
    stocks: [, [Validators.required, Validators.min(0)]],
  });

  validateField(arg: string) {
    //This is a form to validate multiple forms without too much functions
    return (
      this.formSubmit.controls[arg].errors &&
      this.formSubmit.controls[arg].touched
    );
  }

  save() {
    //Submitting the form
    if (this.formSubmit.invalid) {
      //This just a verification to throw all the errors with touched
      this.formSubmit.markAllTouched();
      return;
    }
    console.log(this.formSubmit.value);
    //You can access the value like an object
  }
}

/*
<form autocomplete="off" [formGroup]="formSubmit" (Submit)="save()" //declaring the form to use>
            <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Games</label>
                <div class="col-sm-9">
                    <input type="text" 
                            name="Games"
                            formControlName="name" //using the values of the formGroup (important to recognize that input is from the form)
                           class="form-control"
                           placeholder="Game name"
                    />
                    <span class="form-text text-danger *ngIf="validateField('name')>//You can use it like this thanks to the formControlName
                    You must fill this field </span>
                </div>
            </div>
</form>

*/
```

> The FormControl make in this way **(name:[value,validators,async validator])**.

> With this [] in the FormControl you can put more than one Validators.

# FormsArray (Add and Delete)

```ts
export class appComponent {
  constructor(private _fb: FormBuilder) {} //Have to import it
  formSubmit: FormGroup = this.fb.group({
    name: [, [Validators.required, Validators.minLength(3)]],
    add: this.fb.array(
      //This is the FormArray
      [
        ["League of Legends", Validators.required], //Position 0 and validators
        ["Tower of Fantasy", Validators.required], //Position 1 and validators
      ],
      Validators.required
    ),
  });
}

addFavorities:FormControl = this.fb.control('',Validators.required); //this is FormControl created to addValues to the array

get favoritesArr() { //This is to define add as a FormArray
    return this.formSubmit.get('add') as FormArray;
  }

  addValues(){
    if(this.formSubmit.invalid){ return;}
    this.favoritiesArr.push(this.fb.control(this.addFavorities.value,Validators.requires))//Using the get property to minimaize the code
    this.addFavorities.reset(); //reset the value when you add the value
  }

  deleteValues(num:number){
    this.favorities.removeAt(num); //You have to give it an index to delete the value
  }

/*
//Using it
//app.component.html

<div class="col-sm-9">
             <div class="input-group mb-1" *ngFor="let item of favoritesArr.controls; let i = index" formArrayName="add">
                <input type="text" class="form-control"
                [formControlName]="i"
                readonly
                />
                <button class="btn btn-outline-danger" type="button">
                    Delete
                </button>
            </div>
        </div>
*/
```

> If one array is invalid all are invalid.

> favoriteArr are the properties of the array , and you can use it in the ngFor.

> The value is the [formControlName] who are putting the value of the arr by the position of it.

> You must have to put the formArrayName at the div or container where you are going to use it

# Reactive Forms (Swiches,Radio and CheckBoxes)

```ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-switchs",
  templateUrl: "./switchs.component.html",
  styles: [],
})
export class SwitchsComponent implements OnInit {
  constructor(private _fb: FormBuilder) {}

  formSubmit: FormGroup = this._fb.group({
    //Just creating the form values  (have to define the form in the html)
    gender: ["M", Validators.required],
    notifications: [true, Validators.required],
    terms: [false, Validators.required],
  });

  person = {
    gender: "M",
    notifications: true,
  };

  ngOnInit(): void {
    this.formSubmit.reset({ ...this.person, terms: true });

    this.formSubmit
      .get("gender")
      .valuesChanges.suscribe((resp) => console.log(resp)); //You are getting the value of gender everytime you change it

    this.formSubmit.valueChanges.subscribe((resp) => {
      delete resp.terms; //With this you are suscribing to the form when any value change
      this.person = resp; //Just changing in real time the object person
    });

    /*More cleaner
    this.formSubmit.valueChanges.suscribe(({terms,...rest})=>{
      this.person= rest; //Just have gender and notifications
    })
    
    */
  }

  savePerson() {
    const value = { ...this.formSubmit.value };
    delete value.terms; //deleting terms
    this.person = value;
  }
}
```

> You have to put the value on the checkboxes to change the value

> The role of switch and radio are just to put true or false.

# Validations Forms

- Forms with patterns (regExp)

```ts
export class basicComponent {
  namePattern: string = "([a-zA-z]+) ([a-zA-Z]+)"; //This is a regular expresion
  //Validate the name to lowercase and uppercase since a-z and spaces.
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  //Validate the email input , to a valid email
  constructor(private _fb: FormBuilder) {}

  formSubmit: FormGroup = this._fb.group({
    name: [, [Validators.required, Validators.pattern(this.namePattern)]], //With pattern you can put a string or a regExp
    email: [, [Validators.requires, Validators.pattern(this.emailPattern)]],
    username: [, Validators.required],
    pass: [, Validators.required],
    confirm: [, Validators.required],
  });
}
```

> regExp are important to validate some patterns

- Custom Validators (synchronous)

```ts
export class basicComponent {
  namePattern: string = "([a-zA-z]+) ([a-zA-Z]+)"; //This is a regular expresion
  //Validate the name to lowercase and uppercase since a-z and spaces.
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  //Validate the email input , to a valid email
  validateUser(control: FormControl): ValidatorsErrors | null {
    //Have to import it (FormControl)
    const value = control.value?.trim().toLowerCase();
    if (value === "szxro") {
      return {
        noSzxro: true, //Error
      };
    }
    return null; ///No error
  }
  constructor(private _fb: FormBuilder) {}

  formSubmit: FormGroup = this._fb.group({
    name: [, [Validators.required, Validators.pattern(this.namePattern)]], //With pattern you can put a string or a regExp
    email: [, [Validators.required, Validators.pattern(this.emailPattern)]],
    username: [, [Validators.required, this.validateUser]], //Just put the function name , no this()
    pass: [, Validators.required],
    confirm: [, Validators.required],
  });
}
```

> if a validator return null is mean that is ok.

> With this form you can put custom validators (synchronous)

> Is better to put the custom validators or regExp in a services or a ts file apart (public regExp).

- Same Password Validator

```ts
//validator.service.ts
export class validatorService {
  validatePassword(pass1: string, pass2: string): ValidationErrors | null {
    //pass1 and pass2 are the formControlName
    return (formGroup: AbstractControl) => {
      //AbstractControl is important
      const pass = formGroup.get(pass1)?.value; //getting the values from the formGroup
      const confirm = formGroup.get(pass2)?.value;

      if (confirm !== pass) {
        formGroup.get(pass2)?.setErrors({ noEqual: true }); //putting the errors to the pass2(confirm)
        return {
          //error
          noEqual: true,
        };
      }

      formGroup.get(pass2)?.setErrors(null); //cleaning the error to the pass2(confirm)
      return null;
    };
  }
}

//app.component.ts
export class appComponent {
  formSubmit: FormGroup = this._fb.group(
    {
      name: [, [Validators.required, Validators.pattern(this._vs.namePattern)]],
      email: [
        ,
        [Validators.required, Validators.pattern(this._vs.emailPattern)],
      ],
      username: [, [Validators.required, this._vs.validateUser]],
      pass: [, Validators.required, Validators.minLength(3)],
      confirm: [, Validators.required],
    },
    {
      validator: [this._vs.validatePassword("pass", "confirm")], //using the function to validate (passing the formControlName)
    }
  );
}
```

- Asynchronous Validator

```ts
//emailValidator.component.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from "@angular/forms";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
}) /*You have to implement it*/
export class EmailValidatorService implements AsyncValidator {
  constructor(private _http: HttpClient) {}

  validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    const email = control.value; //this is the formControlName (when you put the asyn validator the formControl is pass)
    return this._http
      .get<any[]>(`http://localhost:3000/usuarios?q=${email}`)
      .pipe(
        map((resp) => {
          return resp.length === 0 ? null : { emailTaken: true };
        })
      );
  }
}

//appComponent.ts
export class appComponent {
  formSubmit: FormGroup = this._fb.group(
    {
      name: [, [Validators.required, Validators.pattern(this._vs.namePattern)]],
      email: [
        ,
        [Validators.required, Validators.pattern(this._vs.emailPattern)],
        [this.ev], //you have to inject the service (just this.ev) with this.ev.validate is not going to work
      ],
      username: [, [Validators.required, this._vs.validateUser]],
      pass: [, Validators.required, Validators.minLength(3)],
      confirm: [, Validators.required],
    },
    {
      validator: [this._vs.validatePassword("pass", "confirm")], //using the function to validate (passing the formControlName)
    }
  );
}
```

> map is use to return null or emailTaken

# Status Form

> In the form exists pending,invalid and valid, the pending part is just waiting to validated the form.

> delay from rxjs operators, is just use to delay response or a function

> You can use in the part of disabled (button [disabled]) form.pending , just to wait the response from the backend.

# Custom Errors

```ts
export registerComponent{
  inputValidate(arg: string) {
    return (
      this.formSubmit.controls[arg].invalid &&
      this.formSubmit.controls[arg].touched
    );
  }

   get emailErrors(): string { //Using get (this act like a property)
    const errors = this.formSubmit.get('email')?.errors; //Getting the field and errors
    if (errors?.['required']) { //Posible errors
      return 'The Email is required';
    } else if (errors?.['pattern']) {
      return 'The Email is invalid';
    } else if (errors?.['emailTaken']) {
      return 'The Email was taken';
    }
    return '';
  }
}
/*
register.component.html
 <div class="col-sm-9">
                    <input type="email"
                           class="form-control"
                           placeholder="Email of the user"
                           formControlName="email"
                    />
                    <span class="form-text text-danger" *ngIf="inputValidate('email')"> //Using the function to determine the errors
                        {{emailErrors}} //Showing the errors
                    </span>
                </div>
*/
```

> This is a form to validate a input with custom errors.

# Reactive Forms: Nested selectors

```ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CountyService } from "../servicies/country.service";
import { CountryResponse } from "../interfaces/country.interface";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styles: [],
})
export class PagesComponent implements OnInit {
  formSubmit: FormGroup = this._fb.group({
    region: ["", Validators.required], //Selects
    country: ["", Validators.required],
  });
  regions!: string[];
  countries!: CountryResponse[]; //Interface of the response

  constructor(private _fb: FormBuilder, private _cs: CountyService) {}

  ngOnInit(): void {
    this.regions = this._cs.regions; //This is just fixed values
    this.formSubmit //When region changes is going to execute this code
      .get("region")
      ?.valueChanges.pipe(
        tap(() => {
          this.formSubmit.get("country")?.reset(""); //Is going to reset the part of country
        }),
        switchMap((region) => this._cs.getRegion(region)) //Is going to get data from the api with the data  given
      )
      .subscribe((country) => {
        this.countries = country;
      });
  }

  sendValues() {
    console.log(this.formSubmit.value);
  }
}
```

> With the select part (html) if you want to get the value in option you have to put value.

> The part of select is where formControlName is going to be.

> the switchMap is going to mutate the value and return other.

> the tap is going to do something one time when is call.
