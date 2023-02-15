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
# array[position] / a list is collection of elements which is ordered and mutable (allow duplicate members)

# Diccionary
diccinary_python = {
'first_name':'Asabeneh',
'last_name':'Yetayeh' # a Diccionary is collection of elements which is unordered and mutable (no duplicated members)
}

# Tuple
names = ("Sebastian","Vargas") # Tuples are inmutable and ordered but dont acept duplicate members
# tuple[position]

# Set
set_python = {1,2,3,4,5} # order is not important in set and dont accept duplcated members  (HashSet C#)

# run python code (python python_filename.py) in the console (must have install python in the machine)

print("aaa" > "bbbb") # compare in alphabetical ordering

# the clasic and, or and not
print(not(3 > 4))

# string templates
format_string = 'I Am {}'.format(variable_name) # `I am ${variable_name}`
print(f'The number is {number}')
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

### Working with strings

```py
# the usual \n \t ....

# Other way that is like template strings

text_variable = "My Name is %s %s"%("Sebastian","Vargas") # is better to use those new ways to concat that this old way
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
# startwith() return True of False (need an argument)
# endswith() return True or False (need an argument)
# find() return the index of the word or -1 is dont find it (need an argument)
# isalnum() is alphanumeric?
# join() concatenated a list (array)
# replace(word,new_word)
# split(pattern) return an array
```

# Working with List

```py
i = ["Sebastian","Vargas", "Juan"]
# i.len() / arr.length();
# i.append(arg) / arr.push(arg);
# i.slice(start:end) / arr.slice(start,end);
# "NVim" in i => return True or False if the file is or is not on the list / array
# remove("value") => remove a given value from a list
# i.pop() / arr.pop();
# del i / delete arr => can use a index (del i[0])
# i.clear() => delete all from the list
# i.count('value') => return the number of value that is in the array
# i.index(value) / arr.indeOf(value)
# i.sort() / arr.sort(); can add reverse = True to descending order

# Destructuring an Array
first,*rest = i
# first => Sebastian , rest => ["Vargas","Juan"]

# Modifing it
i[0] = "Juan"

# Insert (inserting a value between a given index)
i.insert(1,"World")

# Making a copy
i_copy = i.copy() # let i_copy = [...i]

# Extending an array
result = i_copy + i # let arr_result = [...i_copy,...i];
# OR
result.extends(i) # let arr_result = [...i];

# Reverse a list
i.reverse()
#OR
i[::-1]
```

### Working with Tuples

```py
i = ("Sebastian","Vargas")

# i.len() => return the length of the tuple
# i[index] => return the value of the desired index
# i[start:end] / tuple.slice(start,end)
# "Hello" in i => return True or False

# Tuple to list
i = i.list()

# Joining Tuples
i_extend = i + x

# Delete tuple
del i

# Can use some functions of the list with tuples
```

### Working with Set

```py

```
