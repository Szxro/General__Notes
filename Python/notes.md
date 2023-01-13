# Python Basics

```py
# comments in python

# Variable Creation
name_string = "Sebastian"

# console.log (python version)
print("Hello World")

# The aritmetics operations (the usual ones)
print(10 // 3) # result: 3 / without //: 3.3333333 (it round the result)
print(3 ** 4) # equivalent to 3^4 = 81

"""This is multiline comment
"""

# Data Types

# String Types
text = "Sebastian"
print(text * 5) # text.repeat(5)

# Integer / Float / Complex
number = 10
double = 10.2 #float
complex_numbers = 1j

# Boolean
boolean = True #| False

# List
array_in_python = [1,2,3,4,5,6,7] # Is similar to array in js
# array[position]

# Diccionary
diccinary_python = {
'first_name':'Asabeneh',
'last_name':'Yetayeh'
}

# Tuple
names = ("Sebastian","Vargas") # Tuples are inmutable
# tuple[position]

# Set
set_python = {1,2,3,4,5} # order is not important in set

# run python code (python python_filename.py) in the console (must have install python in the machine)

print("aaa" > "bbbb") # compare in alphabetical ordering

# the clasic and, or and not
print(not(3 > 4))

# string templates
format_string = 'I Am {}'.format(variable_name) # `I am ${variable_name}`
```

### Some built in functions

```py
# Some built in functions

length_python = len(text) # return the length

number_to_string = str(number) # convert to string

string_to_number = int(number_to_string) # convert to number

number_to_float = float(number) # convert to float

names = input("Enter Your Name:") # it takes what user type in the input

min_number = min(10,1,2,45) # return the min value (can use a list)

max_number = max(10,1,2,45) # return the max number (can use a list)

sum_of_the_list = sum([1,2,3,4,5]) # return the sum of the list (it only take list (iterables) and it count from 0)

# Declaring multiples variables
first_name, last_name, country, age, is_married = 'Asabeneh', 'Yetayeh', 'Helsink', 250, True
```

### Some Strings Function

```py
# the usual \n \t ....

# Other way that is like template strings

text_variable = "My Name is %s %s"%("Sebastian","Vargas") # is better to use those ways to concat that the old way
# for numbers is %n , for float is %f

print(f"Hello {variable_name}")

# Destructuring a String / The variables have to be the same as the size of the string
a,b = "SE"
# a = S
# b = E

# slice
print(variable_name[1:3]) # variable_name.slice(1,3)

# reverse string (can use in arrays too (list))
print(variable_name[::-1])

# capitalize() => like angular pipe
print(variable_name.capitalize()) # upper()
# count("t") how many t is in the variable
# isnumeric() is all numberic?
# lower()
# isupper() the text is in uppercase?
```
