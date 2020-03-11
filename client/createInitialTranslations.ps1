Get-ChildItem -Path ".\src\*.js" -Recurse | Select-String -Pattern "(?<=t\(')(.*?)(?='\))" -AllMatches | % { $_.Matches } | % {('"{0}": "{0}",' -f $_.Value) } > translations-fi.json
