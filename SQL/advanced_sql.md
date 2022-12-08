# Sub_Query in SQL

```sql
--BASIC SUBQUERY SKELETON
/*
SELECT * FROM TABLE_NAME -- OUTER QUERY / Main query
WHERE CONDITION > (SUB_QUERY)

--Differents types of subqueries

/*
Scalar subqueries
-- just return 1 row and 1 column

Multiple row/column subqueries
-- return multiple rows nd columns
-- return 1 column with multiple rows

Correlated subqueries
-- are the subqueries that are related to the main one

Subqueries inside a subqueries
-- the name define itself.

*/

--SCALAR SUBQUERY

--Find the Employee who has greater salary than the avg salary of all employee
SELECT * FROM EMPLOYEE WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEE)

/*
Problem 1 in parts
 1 - First part is to search all the info about the employee table
 2 - Second part is to get the avg salary of all employee
 3 - Third the employee that meet the condition are show
*/

--OTHER FORM
SELECT e.name,e.salary,avg_sal.sal as avg_sal
FROM employee e
JOIN (SELECT AVG(salary) as sal FROM employee) AS avg_sal
ON e.salary > avg_sal.sal;

/*
1 - First get some columns of employee
2 - JOIN (sub_query as nickname from table_name) AS table_name (create like a new table with the result)
3 - ON (condition) / in this part is just to put some condition
4 - avg_sal.sal acceding like a normal join and showing it in the result table
*/

--Multiple row / column subqueries

--Find the employees that have higher salaries by the departments
SELECT e.name,d.dpt_name,e.salary FROM employee e
LEFT JOIN departament d
ON e.Id = d.employee_id
WHERE (e.salary) IN (SELECT MAX(salary)from employee)


/*
1- Get some values with the tables of departament and employee (with a left join)
2- In the subquery part is just select the max value(salary) in the employee table
3- in the condition is searching is some salary match with it and return the result
*/

--OTHER FORM
SELECT e.name,dpt_salary.dpt_name, dpt_salary.max_salary  FROM employee e
JOIN (SELECT d.dpt_name AS dpt_name, MAX(e.salary) AS max_salary
FROM employee e
LEFT JOIN departament d ON e.Id = d.employee_id
GROUP BY d.dpt_name) AS dpt_salary
ON e.salary = dpt_salary.max_salary;

/*
1- Getting some values with the tables
2- The join part is just to create a table with the desired colums
3- in the on part is just the condition like the above
*/

-- Single column,multiple row subqueries

--Find the salary of all employee and dont return the minimun salary
SELECT e.name,e.salary FROM employee e
WHERE e.salary NOT IN (SELECT MIN(salary) AS MINSALARY FROM employee)

-- Collateral subquery

SELECT * FROM employee e1
WHERE salary > (SELECT AVG(salary)FROM employee e2 WHERE e2.name = e1.name)
--The subquery can be executed like Scalar subqueries because is related to the main one (e1)
-- The subquery is just going to return the names of the employee that have greater salary than the average


--Other Example
SELECT * FROM employee e1
WHERE EXISTS(SELECT 1 from departament d WHERE e1.id = d.employee_id)
--Return all the employees that their foreign key exists in the department table


-- Subquery in a Subquery
SELECT *
FROM(
    SELECT dept_name,SUM(sales) AS SUM
    FROM sales GROUP BY dept_name) AS total_sum
JOIN(SELECT AVG(SUM) AS avg_sales FROM
    (
    SELECT dept_name,SUM(sales) AS SUM
    FROM sales
    GROUP BY dept_name AS total_sum
    )
    ) AS avg_sales
    ON sales.SUM > avg_sales.avg_sales;
--FIND THE DEPARTMENT WHO SELL MORE THAN THE AVERAGE

--SELECT with a SUBQUERY condition
SELECT *,
(CASE WHEN salary >
		(SELECT AVG(salary) FROM employee)
		THEN 'Higher'
	ELSE CONVERT(nvarchar,0)
END) AS REMARKS
FROM employee

--is not recomend to do like this beacuse all the queries have to run ti return the desired result

--OTHER WAY (BETTER)
SELECT *,
(CASE WHEN salary > AVG_SAL.sal
		THEN 'Higher'
	ELSE CONVERT(nvarchar,0)
END) AS REMARKS
FROM employee
CROSS JOIN (SELECT AVG(salary) sal FROM employee) AVG_SAL


-- Example with aggregate function
SELECT name,SUM(salary) as total_salary
FROM employee
GROUP BY name
HAVING sum(salary) > (SELECT AVG(salary) FROM employee)

/*
1. The first part return the name and the total salary of the employees and group by it
2. the second part(having) just return the employee that gained more than the avg salary
*/
```

> Is better to use joins or scalar subqueries or multiple rows subqueries than use a collateral because the condition is read all the time that the query is runned.

> The subquery in a subquery can be improve with the WITH clause.

> We can use subquery with the SELECT,FROM,HAVING,WHERE etc....

> Is not recomend to use a subquery in the select clause.

> We can use this methods with subqueries **INSERT,UPDATE,DELETE,ETC...**
