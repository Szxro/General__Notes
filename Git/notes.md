# Git Commands

```
git config --global user.name "username"
--save the given username in the config of git

git config --global user.email "username"
--save the given user email in the config of git

git init
--initialize git to track the files

git add . / git add "file.txt"
--add all the files / add the file given

git commit
--open vim to commit the changes

git commit -m "commit"
--commit all the files with one line

git status
--tell the status of the files

git pull
--get all the new files that are in the repository

git push
--push the files into the repository

git log
--get all the commit to the files

git log --oneline
--get all the commit in oneline

git diff
--view the diff between the files (modified/tracked) ones

git diff --staged
--view the diff between the files that are not commited and the commited ones

git clone
--clone a repository

git branch
--show the branches that are in the project

git branch "branch_name"
--create a new branch

git branch -d "branch_name"
--delete a branch

git checkout
--check the branch like git status

git checkout "branch_name"
--switch to the desired branch

git rm "file.extension"
--remove a file

git mv "existing_path" "new_path"
--move a file to desired path

```

# Git Ignore

- Just name a file .gitignore , and put the files that you want to git ignore or the extensions or folders

```
*.extension
--ignore all the files that have that extension

## Comments ##
--use for comments with gitignore
```
