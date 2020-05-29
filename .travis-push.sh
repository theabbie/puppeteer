setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_country_json_files() {
  git checkout master
  dateAndMonth=`date "+%b %Y"`
  git add .
  git commit -m "Travis update: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"
}

upload_files() {
  # Remove existing "origin"
  git remote rm origin
  # Add new "origin" with access token in the git URL for authentication
  git remote add origin https://theabbie:${GH_TOKEN}@github.com/theabbie/android.git > /dev/null 2>&1
  git push origin master --quiet
}

setup_git

commit_country_json_files

# Attempt to commit to git only if "git commit" succeeded
if [ $? -eq 0 ]; then
  echo "A new commit with changed country JSON files exists. Uploading to GitHub"
  upload_files
else
  echo "No changes in country JSON files. Nothing to do"
fi
