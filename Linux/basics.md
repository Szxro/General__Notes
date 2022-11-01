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

mv <filename.extension> <new filename.extension>
-- rename a file

mv <file> <path> / <path/newName>
-- move to a path and rename the file

mv <directoryname> <path/newname> / <new directoryname>
-- move to a path and rename the directory or just rename the directory
```

> With the touch file can create more than one file **touch file.txt file2.txt**

# Work with file content

```
head <filename.extension>
-- print the first lines of the file

head -<count> <filename.extension>
-- print the count lines of the file

tail <filename.extension>
-- print the last lines of the file

cat <filename.extension>
-- print all the file

cat <filename.extension> / <path/filename.extension>
-- concat the first file with the second one

echo <file content> > <filename.extension>
-- create the file and put the content in it (in the directory that you are located)

cat <filanme.extension> <filename.extension> > <filename.extension>
-- read the files and the result is save > in the new file

cat > <filename.extension>
-- create and put the content into the file when you finish (to finish **left ctrl + d**)

cat <filename.extension> > <filename.extension>
-- make a exact copy of that file

more <filename.extension>
-- show the file by parts (to continue press **Space**)

less <filename.extension>
-- the oposite of more (just use the keyboard arrows and to quit hit **q**)

```

# System Commands

```
uptime
-- tell how long the system has been running

free
-- tell the free memory avaliable

ps -A
-- show a snapshot of all the proccess of the system (you can kill a process with the id given)

df / df -h <humanable readable>
-- report all the usage of the disk

fdisk / fdisk -l
-- show info about the partion tables (have to be root(sudo))

top
-- display all the system process in real time

htop
-- display a better representation in real time of the system process (have to install it), to quit just F10 or q.

```

# NetWorking Commads

```
ifconfig
-- configure the network interface (have to install it, if the system dont have it), most people use it like the ipconfig(Windows).

ping <url>
-- send ICMP ECHO_REQUEST to network hosts like (Windows)

ip
-- show / manipulate routing, network devices, interfaces and tunnels

ip a
-- show the network config
```

# Package Manager (Sudo)

```
sudo = super user do (sudo)
apt = command line interface (advanced package manager tool) use for update or install packages

sudo apt update
-- search the package to update and show it with apt list --upgradable

sudo apt upgrade
-- update all the package that can be update (update the system)

sudo apt search <package name>
-- search the repository where is located that package

sudo apt install <package name>
-- install that package

sudo apt remove <package name>
-- remove that package
```

> Is better to update or install package with the console that the app that ubuntu provide

# Text Editor (Nano/Vim)

```
nano <filename.extension>
-- init the text editor

vim <filename.extension>
-- init the vim editor (have to install it)

/*
Some Vim commands :
A : Insert mode (Can write in it)
Press ESC : exit the insert mode and can navigate the file
Press ESC + :w = save the file with the content in it
:q  = exit vim
:wq = save the changes and exit vim
:q! = exit vim without saving nothing
*/
```

> ctrl + g and the other config is how to move or use nano

> Vim run with commands
