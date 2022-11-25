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

git commit --amend
--can edit the last commit made

git status
--tell the status of the files

git fetch <remote>
--download all the changes from this remote

git merge <remote/branch> <local_branch>
--merge the changes in the local branch

git pull
-- shorthand for git fetch and git merge origin/master or master/master

git merge <branch_names>
--merge the changes in to two or more branches

git push
--push the files into the repository

git push <remote> <local_branch>
--push to the desired remote repository with the desired branch

git log
--get all the commit to the files

git log --oneline
--get all the commit in oneline

git log -<n>
-- limit log output

git log --since / --until "date"
--limit the log output by a certain date

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

git checkout -b "branch_name"
--create and change to the new created branch

git rm "file.extension"
--remove a file

git mv "existing_path" "new_path"
--move a file to desired path

git revert "id_commit"
--revert a commit but have to search the id of the commit

git remote add <shortname> "url"
-- create a new remote

git remote show <remote>
-- show all the info about where the code is push or fetch

git remote remove <remote_name>
-- remove the remove

git tag "tag_name"
-- create a tag in a commit

git show "tag_name"
--show the tag created

git tag -a "tag_name" -m "message"
--create a annotated tag with a message

git push <remote> "tag_name" / git push <origin> --tags
--push to the repository the tag and the project / push all with the tags
```

> git log is going to let you the commit and the id

# Git Ignore

- Just name a file .gitignore , and put the files that you want to git ignore or the extensions or folders

```
*.extension
--ignore all the files that have that extension

## Comments ##
--use for comments with gitignore
```
