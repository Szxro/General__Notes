# Transact SQL

## String Functions

```sql

--Strings Functions

-- RIGHT / LEFT FUNCTIONS
SELECT name,
LEFT(name,3) AS LEFT3,
RIGHT(name,3)RIGHT3
FROM users
--RETURN THE FIRST 3 CHARACTERS IN THE LEFT SIDE LEFT(string,number_characters)
--RETURN THE FIRTS 3 CHARACTERS IN THE RIGHT SIDE RIGHT(string,number_characters)

-- UPPER/LOWER FUNCTIONS

SELECT name,
UPPER(name)
FROM users
-- RETURN in uppercase or lowercase the given varchar

-- REPLACE / LEN Function

SELECT name,
REPLACE(name,'h','*') AS REPLACED,
LEN(name) AS LENGTH
FROM users
--REPLACE the given string with something , REPLACE(string,string_to_be_replaced,new_string)
--LEN = Return the length of the string
```

> The REPLACE part is case sensitive

# Date Functions

```sql

--GETDATE()

SELECT
GETDATE()
--Return the date

--DATEPART()

SELECT
GETDATE() AS SYSTEMDATE,
DATEPART(YEAR,GETDATE()) AS SYSTEMYEAR, --RETURN THE YEAR GIVEN IN THE GETDATE FUNCTION
DATEPART(MONTH,GETDATE()) AS SYSTEMMONTH, --RETURN THE MONTH GIVEN IN THE GETDATE FUNCTION
DATEPART(DAY,GETDATE()) AS SYSTEMDAY --RETURN THE DAY GIVEN IN THE GETDATE FUNCTION
YEAR(GETDATE()) --RETURN the year of the given date
--DATEPART(INTERVAL,DATE) RETURN THE INTERVAL GIVEN
-- YEAR / MONTH /DATE DO THE SAME AS DATEPART


```

>
