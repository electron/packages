# electron-npm-packages

A collection of all npm packages that mention `electron` in their `package.json`

## Reports

- [All Packages](reports/packages.md)
- [Packages by Keyword](reports/keywords.md)

## Usage

To use this as a node module:

```sh
npm install electron-npm-packages --save
```

then

```js
const packages = require('electron-npm-packages')
// object with package names as keys and package objects as values
```

## Observations

```sh
# total packages
ls packages | wc -l                                        
# 1079

# cumulative size of all package.jsons
du -hs packages  
# 10M

# packages using electron-prebuilt
find packages/* | xargs grep -l "electron-prebuilt" | wc -l
# 437

# packages using electron-packager
find packages/* | xargs grep -l "electron-packager" | wc -l
# 143

# semver ranges used for electron-prebuilt
grep -r '"electron-prebuilt":' packages | cut -f 3 -d ":" | sort
# "*"
# "*",
# "0.30.0",
# "0.30.1",
# "0.31.2",
# "0.33.7"
# "0.34.0"
# ...
```

## License

MIT
