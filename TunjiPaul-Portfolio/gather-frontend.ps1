# PowerShell script to gather frontend project files
$OUTPUT = "frontend_context.txt"

# Create/clear the output file
New-Item -Path $OUTPUT -ItemType File -Force | Out-Null

"================================ FRONTEND PROJECT CONTEXT ================================" | Out-File -FilePath $OUTPUT -Append
"" | Out-File -FilePath $OUTPUT -Append

# ========================================
# CONFIGURATION FILES
# ========================================
"================================" | Out-File -FilePath $OUTPUT -Append
"CONFIGURATION FILES" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

$configFiles = @(
    "package.json",
    "vite.config.ts",
    "vite.config.js",
    "tsconfig.json",
    "tsconfig.node.json",
    "tailwind.config.js",
    "tailwind.config.ts",
    "postcss.config.js",
    ".env.example"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        "" | Out-File -FilePath $OUTPUT -Append
        "--- FILE: $file ---" | Out-File -FilePath $OUTPUT -Append
        Get-Content $file | Out-File -FilePath $OUTPUT -Append
    }
}

# ========================================
# SOURCE FILES
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"SOURCE FILES" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

# Main entry files
$entryFiles = @(
    "src\main.tsx",
    "src\main.jsx",
    "src\App.tsx",
    "src\App.jsx",
    "src\index.tsx",
    "src\index.jsx"
)

foreach ($file in $entryFiles) {
    if (Test-Path $file) {
        "" | Out-File -FilePath $OUTPUT -Append
        "--- FILE: $file ---" | Out-File -FilePath $OUTPUT -Append
        Get-Content $file | Out-File -FilePath $OUTPUT -Append
    }
}

# ========================================
# COMPONENTS
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"COMPONENTS" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

# Get all component files (tsx, jsx)
$componentExtensions = @("*.tsx", "*.jsx")
foreach ($ext in $componentExtensions) {
    Get-ChildItem -Path "src\components" -Filter $ext -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
        $relativePath = $_.FullName -replace [regex]::Escape($PWD.Path + "\"), ""
        "" | Out-File -FilePath $OUTPUT -Append
        "--- FILE: $relativePath ---" | Out-File -FilePath $OUTPUT -Append
        Get-Content $_.FullName | Out-File -FilePath $OUTPUT -Append
    }
}

# ========================================
# PAGES
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"PAGES" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

foreach ($ext in $componentExtensions) {
    Get-ChildItem -Path "src\pages" -Filter $ext -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
        $relativePath = $_.FullName -replace [regex]::Escape($PWD.Path + "\"), ""
        "" | Out-File -FilePath $OUTPUT -Append
        "--- FILE: $relativePath ---" | Out-File -FilePath $OUTPUT -Append
        Get-Content $_.FullName | Out-File -FilePath $OUTPUT -Append
    }
}

# ========================================
# SERVICES
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"SERVICES / API" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

$serviceExtensions = @("*.ts", "*.tsx", "*.js", "*.jsx")
foreach ($ext in $serviceExtensions) {
    Get-ChildItem -Path "src\services" -Filter $ext -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
        $relativePath = $_.FullName -replace [regex]::Escape($PWD.Path + "\"), ""
        "" | Out-File -FilePath $OUTPUT -Append
        "--- FILE: $relativePath ---" | Out-File -FilePath $OUTPUT -Append
        Get-Content $_.FullName | Out-File -FilePath $OUTPUT -Append
    }
}

# Check alternative paths (api, lib, utils for services)
$alternativePaths = @("src\api", "src\lib")
foreach ($path in $alternativePaths) {
    if (Test-Path $path) {
        foreach ($ext in $serviceExtensions) {
            Get-ChildItem -Path $path -Filter $ext -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
                $relativePath = $_.FullName -replace [regex]::Escape($PWD.Path + "\"), ""
                "" | Out-File -FilePath $OUTPUT -Append
                "--- FILE: $relativePath ---" | Out-File -FilePath $OUTPUT -Append
                Get-Content $_.FullName | Out-File -FilePath $OUTPUT -Append
            }
        }
    }
}

# ========================================
# TYPES
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"TYPES / INTERFACES" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

$typePaths = @("src\types", "src\interfaces", "src\models")
foreach ($path in $typePaths) {
    if (Test-Path $path) {
        Get-ChildItem -Path $path -Filter "*.ts" -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
            $relativePath = $_.FullName -replace [regex]::Escape($PWD.Path + "\"), ""
            "" | Out-File -FilePath $OUTPUT -Append
            "--- FILE: $relativePath ---" | Out-File -FilePath $OUTPUT -Append
            Get-Content $_.FullName | Out-File -FilePath $OUTPUT -Append
        }
    }
}

# ========================================
# CONTEXT / STATE MANAGEMENT
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"CONTEXT / STATE" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

$contextPaths = @("src\context", "src\contexts", "src\store")
foreach ($path in $contextPaths) {
    if (Test-Path $path) {
        foreach ($ext in $componentExtensions) {
            Get-ChildItem -Path $path -Filter $ext -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
                $relativePath = $_.FullName -replace [regex]::Escape($PWD.Path + "\"), ""
                "" | Out-File -FilePath $OUTPUT -Append
                "--- FILE: $relativePath ---" | Out-File -FilePath $OUTPUT -Append
                Get-Content $_.FullName | Out-File -FilePath $OUTPUT -Append
            }
        }
    }
}

# ========================================
# HOOKS
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"CUSTOM HOOKS" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

if (Test-Path "src\hooks") {
    foreach ($ext in $serviceExtensions) {
        Get-ChildItem -Path "src\hooks" -Filter $ext -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
            $relativePath = $_.FullName -replace [regex]::Escape($PWD.Path + "\"), ""
            "" | Out-File -FilePath $OUTPUT -Append
            "--- FILE: $relativePath ---" | Out-File -FilePath $OUTPUT -Append
            Get-Content $_.FullName | Out-File -FilePath $OUTPUT -Append
        }
    }
}

# ========================================
# ROUTES
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"ROUTES" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

$routePaths = @("src\routes", "src\router")
foreach ($path in $routePaths) {
    if (Test-Path $path) {
        foreach ($ext in $componentExtensions) {
            Get-ChildItem -Path $path -Filter $ext -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
                $relativePath = $_.FullName -replace [regex]::Escape($PWD.Path + "\"), ""
                "" | Out-File -FilePath $OUTPUT -Append
                "--- FILE: $relativePath ---" | Out-File -FilePath $OUTPUT -Append
                Get-Content $_.FullName | Out-File -FilePath $OUTPUT -Append
            }
        }
    }
}

# ========================================
# UTILITIES
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"UTILITIES" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

if (Test-Path "src\utils") {
    foreach ($ext in $serviceExtensions) {
        Get-ChildItem -Path "src\utils" -Filter $ext -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
            $relativePath = $_.FullName -replace [regex]::Escape($PWD.Path + "\"), ""
            "" | Out-File -FilePath $OUTPUT -Append
            "--- FILE: $relativePath ---" | Out-File -FilePath $OUTPUT -Append
            Get-Content $_.FullName | Out-File -FilePath $OUTPUT -Append
        }
    }
}

# ========================================
# STYLES
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"STYLES" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

$styleFiles = @(
    "src\index.css",
    "src\App.css",
    "src\styles\index.css",
    "src\styles\globals.css"
)

foreach ($file in $styleFiles) {
    if (Test-Path $file) {
        "" | Out-File -FilePath $OUTPUT -Append
        "--- FILE: $file ---" | Out-File -FilePath $OUTPUT -Append
        Get-Content $file | Out-File -FilePath $OUTPUT -Append
    }
}

# ========================================
# SUMMARY
# ========================================
"" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append
"FILE SUMMARY" | Out-File -FilePath $OUTPUT -Append
"================================" | Out-File -FilePath $OUTPUT -Append

# Count files by type
$content = Get-Content $OUTPUT -Raw
$fileCount = ($content -split "--- FILE:").Count - 1

"" | Out-File -FilePath $OUTPUT -Append
"Total files gathered: $fileCount" | Out-File -FilePath $OUTPUT -Append
"" | Out-File -FilePath $OUTPUT -Append

Write-Host " Frontend files gathered successfully!" -ForegroundColor Green
Write-Host " Output file: $OUTPUT" -ForegroundColor Green
Write-Host " Total files: $fileCount" -ForegroundColor Cyan
Write-Host ""
Write-Host "You can now share this file with me to generate a proper README!" -ForegroundColor Yellow