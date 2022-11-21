> To create a project is just select the windows forms with VB

> To create a button , just have to drag it in the form and to code some action double click in it.

# Code in the create button or object

```vb
Public Class Form1 'Beginning of the class
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
    'Begginning of the method
        Console.WriteLine("Hello World")
    End Sub'End of the method
End Class'End of the class
```

> Sub = Method

> Class = Class

> Beware of the indentation is like python.

> To Change the name of the object that you put in the form have to right-click and search for properties and search for name.

# Message Box (Basic)

```vb
'In the method (sub)
Msgbox("Hello World")

'Other form
MessageBox.Show("Hello World")
```

> VB dont use semi-colon.

> Can double-click the form to do something when it load.

# Variables Types

![](./images/first_part.png)
![](./images/second_part.png)

> More info https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/data-types/

> Decimal = Float

# Variables and Concatenation

```vb
'Creating a Variable and putting its type
Dim stFirstName As String
Dim dtDateTime As Date

stFirstName = "Hello Pedro" 'Using the variable
dtDateTime = #11/04/2022#
'The Date need to be in the american way (day/month/year)

MessageBox.Show(stFirstName & vbNewLine & "Concatenation")
'& Concatenation sign
'vbNewLine = WriteLine
```

> the variable full name have to be st(string) FirstName(variable name)

> Is important the spaces with the concatenation

> can concat space like **& " " &** (that is a space)

> Is like a usual var are mutable

# Inputs Forms

```vb
'sub part = method part
Dim stInputBox As String

'It going to show a input box
stInputBox = InputBox("Enter some info")

MessageBox.Show("Hello " & stInputBox)

'Getting info by an input

Dim stName As String

stName = txtName.Text; 'Getting the text from the input

MsgBox(stName)

'Making a List Input (List of Items)
Dim stOccupation As String

stOccupation = lsOccuptaion.SelectItem

MsgBox(stOccupation)

'FormLoad

'Adding a new item when the form load
lsOccupation.Items.Add("Hello Mundo")
'listName.Items.Add(Item)
```

> The input box is an action to the button

> Input = TextBox

> The list of items = Input List

# Operators Visual Basic

> More info https://www.tutlane.com/tutorial/visual-basic/vb-operators
