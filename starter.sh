#!/bin/bash

## setup prettier and eslint 
# npm init -y
# npm i prettier --save-dev 
# npm init @eslint/config
# npm i eslint-plugin-prettier --save-dev
# npm i --save-dev eslint-config-prettier --save-dev

# new_plugin='["prettier"]'
# new_rule='{"prettier/prettier": "error"}'
# new_extends='["prettier"]'
# jq ".plugins = $new_plugin" .eslintrc.json > temp.json && mv temp.json .eslintrc.json
# jq ".rules = $new_rule" .eslintrc.json > temp.json && mv temp.json .eslintrc.json
# jq ".extends += $new_extends" .eslintrc.json > temp.json && mv temp.json .eslintrc.json 

# touch .prettierrc
# echo "{
#   "tabWidth": 2,
#   "useTabs": false,
#   "singleQuote": false,
#   "bracketSameLine": true
# }" > .prettierrc


## setup typescript 
npm i typescript --save-dev
touch tsconfig.json 
echo '{
    "compilerOptions": {
      "target": "ES5",                                 
      "module": "commonjs", 
      "lib": ["DOM","ES6"],                              
      "outDir": "./dist",                                  
      "esModuleInterop": true,                            
      "forceConsistentCasingInFileNames": true,            
      "strict": true,                                     
      "noImplicitAny": true,  
      "skipLibCheck": true,
      "useUnknownInCatchVariables": false                       
    },
    "exclude": ["node_modules","./dist","spec"],
    "include": ["src/**/*"]
}' > tsconfig.json


## setup script section in package.json
# new_script='{"lint": "eslint \"src/**/*.{jsx,js}\" --fix","pretty": "prettier --write \"./**/*.{js,jsx,json}\""}'
# jq ".scripts = $new_script" package.json > temp.json && mv temp.json package.json

## setup .gitignore file
# touch .gitignore
# echo node_modules > .gitignore
