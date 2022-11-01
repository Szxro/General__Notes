# Basics Commands

```
man <command>
-- Is going to throw a documentation for how that command works..

dir
-- Show the directory tree on where you are located

cd <location> <path>
-- Where to move like Windows (change directory)

cd ..
-- Move out to that directory that you are in

exit
-- Just close the terminal

clear
-- The same as cls (Windows)

pwd
-- Print where you are located (directory)

ls
-- list directory of content

ls -a
-- Show all the files(The hides too)

ls (path)
-- show all the files that are in that path

mkdir
-- create a directory where you are located

mkdir -p ej/eje/eje
-- create multiples folders in a route

rmdir foldername
-- delete a folder

rmdir -p fatherdirectory (Hello/World/)
-- delete the directory tree
```

> The man command is going to throw all the info about the command

> can use cd , cd/home (relative directory) and the terminal is going to be in the home part , to go back cd szxro or cd (by default it will return to the root part or cd ...).

> To hide a file just put a . infront of the name (.HelloWorld.js).

> can combine some commands ls -la (long-all) or ls -lah (long-all-humanreadable)
> <<<<<<< HEAD

> Press tab when you are writing a folder or filename and it will auto-complete

# Working with files

```
file (filenmame.extension)
-- return file type and some description about it.

touch (filename.extension) (hello.txt hello2.txt)
-- create or modify files

rm (filename.extension)
-- remove file (delete it).

rm -i (filename.extension)
-- remove file but with interaction

rm -rf (filename.extension/directory)
-- force to remove file

cp (filename.extenstion) (filename.extension)
-- copy files or directories (the first is the file that want to copy and the second the option and the name of the copy file)

cp (filename.extension) (path) (ejem: /home/szxro/Desktop/)
-- copy files to a specify path

cp -r <directoryname> <copy directoryname>
-- make a copy of the directory

```

> With the touch file can create more than one file **touch file.txt file2.txt**
