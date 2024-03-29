# Transact SQL

> The () are important to do some operations

> Beware of the nulls in some cases are important

## DYNAMICS VARIABLES in SQL

```sql
--DECLARING A VARIABLE
DECLARE @VALUE INTEGER;

--DECLARING MULTIPLE VARIABLES
DECLARE @VALUE INTEGER,
		@TEXT VARCHAR(100);

--SET A VALLUE IN THE VARIABLE
SET @VALUE = 1;

--SET A SQL STATEMENT
SET @VALUE = (SELECT MIN(AGE) FROM USERS);

--DEFAULT VALUES
DECLARE @VALUE int = 10;
```

## BEGIN / END / PRINT in SQL

```sql
BEGIN
DECLARE @VALUE INT = 10;
PRINT @VALUE --PRINTING IN SQL
END

```

> BEGIN and END are used in Transact-SQL to group a set of statements into a single compound statement, so that control statements such as IF … ELSE, which affect the performance of only a single SQL statement, can affect the performance of the whole group.

# Loops in SQL

```sql
BEGIN
	DECLARE @VALUE = 0;
	WHILE @VALUE < 5
		BEGIN
			PRINT @VALUE
			SET @VALUE +=1
		END
END
```

> The normal while loops

## String Functions

```sql

--Strings Functions

-- RIGHT(string,position) / LEFT(string,position)
SELECT name,
LEFT(name,3) AS LEFT3,
RIGHT(name,3)RIGHT3
FROM users
--RETURN THE FIRST 3 CHARACTERS IN THE LEFT SIDE LEFT
--RETURN THE FIRTS 3 CHARACTERS IN THE RIGHT SIDE RIGHT

-- UPPER(string) / LOWER(string)

SELECT name,
UPPER(name)
FROM users
-- RETURN in uppercase or lowercase the given varchar

-- REPLACE(string,string_to_be_replaced,new_string) / LEN (string)

SELECT name,
REPLACE(name,'h','*') AS REPLACED,
LEN(name) AS LENGTH
FROM users
--REPLACE the given string with something
--LEN = Return the length of the string
```

> The REPLACE part is case sensitive

# Date Functions

```sql

--GETDATE()

SELECT
GETDATE()
--Return the date

--DATEPART(INTERVAL,DATE) RETURN THE INTERVAL GIVEN
SELECT
GETDATE() AS SYSTEMDATE,
DATEPART(YEAR,GETDATE()) AS SYSTEMYEAR, --RETURN THE YEAR GIVEN IN THE GETDATE FUNCTION
DATEPART(MONTH,GETDATE()) AS SYSTEMMONTH, --RETURN THE MONTH GIVEN IN THE GETDATE FUNCTION
DATEPART(DAY,GETDATE()) AS SYSTEMDAY --RETURN THE DAY GIVEN IN THE GETDATE FUNCTION
YEAR(GETDATE()) --RETURN the year of the given date
-- YEAR / MONTH /DATE DO THE SAME AS DATEPART

--DATEADD(INTERVAL,EXPRESSION,DATE)
SELECT
DATEADD(YEAR,-1,GETDATE());--RETURN A NEW DATE WITH THE EXPRESSION GIVEN


--DATEDIFF(INTERVAL,STARTING_DATE,ENDING_DATE);
SELECT
DATEDIFF(YEAR,'2021-12-01 10:48:05.490',GETDATE());--RETURN THE DIFF BETWEEN DATES
```

> The DATEADD return a date with the expression like (-1,+3) etc ...

# NULL FUNCTIONS

```sql
--NULL = UNKNOWN

--ISNULL(VALUE,VALUE_EXCHANGE)
SELECT ISNULL(name,'*') AS NULLNAMES ,ISNULL(Age,0) AS NULLAGES FROM users;
--RETURN THE VALUE BUT IF IT IS NULL IS GOING TO RETURN THE EXCHANGE_VALUE

--COALESCE(VALUE,VALUE_EXCHANGE)
SELECT COALESCE(name,'*') AS NULLNAMES FROM users;
--WORK THE SAME AS IS NULL BU IN DIFF WAYS.
```

> Because ISNULL is a function, it is evaluated only once. As described above, the input values for the COALESCE expression can be evaluated multiple times. COALESCE basically translates to CASE expression and ISNULL is a built-in implemented in the database engine.

# OTHERS FUNCTIONS

```sql

--TOP(VALUES_TO_RETURN)
SELECT
TOP(10) *
FROM USERS
--RETURN THE 10 FIRST ROWS

--FORMAT( value, format [, culture ] )
SELECT
FORMAT(GETDATE(),'d','es-ES') AS DATEFORMAT
--RETURN FORMAT THE DATE BY CULTURE AND THE FORMAT

--EOMONTH(DATE)
SELECT EOMONTH(GETDATE()) AS 'ENDMONTH'
--RETURN THE END OF THE MONTH OF THE GIVEN DATE
```

> In the Top part can put percent like (SELECT TOP(3) PERCENT / SELECT THE FIST 3% OF ROWS)

# IS NOT EQUAL (OTHER VERSION)

```sql
SELECT name
FROM users
WHERE name != 'Something'

-- IS EQUAL TO THIS

SELECT name
FROM users
WHERE name <> 'Something'
```

# IN (WHERE)

```sql
--The IN operator allows you to specify multiple values in a WHERE clause.
	SELECT
	name
	FROM users
	WHERE name IN ('Pedro','Sebastian','Sebastien');
    --Return all the names that are in that list
```

> Can use IN NOT too.

# CAST (CONVERT TO..)

```sql
--CAST(VALUE AS TYPE_TO_CONVERT)
SELECT CAST(1 AS varchar)
--Return the value to the desired type if it is possible

--CONVERT(TARGET_TYPE,EXPRESSION)
SELECT CONVERT(varchar,1)
--Return the value to the desired type
```

## TRANSACTION

```sql
--EXPLICIT TRANSACTION
BEGIN TRANSACTION;
SELECT * FROM USERS;
COMMIT;

--EXPLICIT NAME TRANSACTION
BEGIN TRANSACTION TRANSACTION_NAME
SELECT * FROM USERS;
COMMIT TRANSACTION TRANSACTION_NAME

--COMMIT A TRANSACTION (ACCEPT THE RESULT)
BEGIN TRANSACTION TRANSACTION_NAME
SELECT * FROM USERS;
COMMIT TRANSACTION TRANSACTION_NAME

--ROLLBACK A TRANSACTION (CANCEL THE RESULT)
BEGIN TRANSACTION TRANSACTION_NAME
SELECT * FROM USERS;
ROLLBACK TRANSACTION TRANSACTION_NAME
```

> Marks the starting point of an explicit local transaction. Explicit transactions begin with the BEGIN TRANSACTION statement and end with the COMMIT or ROLLBACK statement.

# BREAK / CONTINUE

```sql
--BREAK (BREAK THE LOOP)
BEGIN
	DECLARE @VALUE INT = 0;
	WHILE @VALUE < 5
		BEGIN
		IF(@VALUE =4)
			BEGIN
				BREAK;
			END
		PRINT @VALUE
		SET @VALUE+=1
	END
END
```

# IF / ELSE SQL

```sql
--IF / ELSE (WORK THE SAME)
BEGIN
	DECLARE @VALUE INT = 0;
	WHILE(@VALUE <= 10)
	BEGIN
		IF(@VALUE < 5)
		BEGIN
			PRINT CONVERT(nvarchar(100),@VALUE) +' '+'BELOW'
		END
		ELSE
		BEGIN
			PRINT CONVERT(nvarchar(100),@VALUE) +' '+'ABOVE'
		END
	SET @VALUE +=1;
	END
END

--IF/ELSE IF / ELSE
BEGIN
	DECLARE @VALUE INT = 0;
	WHILE(@VALUE <= 10)
	BEGIN
		IF(@VALUE < 5)
		BEGIN
			PRINT CONVERT(nvarchar(100),@VALUE) +' '+'BELOW'
		END
		ELSE IF(@VALUE = 6)
		BEGIN
			PRINT CONVERT(nvarchar(100),@VALUE) + ' ' + 'SIX'
		END
		ELSE
		BEGIN
			PRINT CONVERT(nvarchar(100),@VALUE) +' '+'ABOVE'
		END
	SET @VALUE +=1;
	END
END
```

# TRY / CATCH

```sql
--TRY / CATCH (WORK THE SAME)
BEGIN TRY
     { sql_statement | statement_block }
END TRY
BEGIN CATCH
     [ { sql_statement | statement_block } ]
END CATCH
```
# CURSOR

```sql
-- CURSOR are use to process one result set , one row at a time (SELECT STATEMENT (are called result-set))

DECLARE cursor_name CURSOR FOR
	SELECT --(QUERY/RESULT SET)/ NEED A RESULT SET PROVIDE
OPEN cursor_name
FETCH NEXT FROM cursor_name INTO variable -- the data that is fetch is going to be located into a variable
CLOSE cursor_name
DEALLOCATE cursor_name -- To not do a infinite loop (memory leaking)
```

# Tricks

```sql
-- database_name.dbo.SY90000 => return all system tables
-- database_name.sys.objects => return all the tables of that database
```


