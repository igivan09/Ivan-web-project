@echo off
echo Starting to update GitHub...
git add .
git commit -m "Auto update website changes"
git push origin main
echo.
echo All your latest changes have been uploaded to GitHub!
pause
