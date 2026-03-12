# ============================================================
# TreeCraft — WebAssembly Build Script (PowerShell)
# Compiles C++ tree implementations to WASM using Emscripten
# ============================================================

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir
$CppDir = Join-Path $ProjectDir "cpp"
$OutputDir = Join-Path $ProjectDir "frontend/public"

# Ensure emcc is in PATH, try to auto-activate if not
if (!(Get-Command emcc -ErrorAction SilentlyContinue)) {
    $EmsdkPath = "C:\Users\krupa\emsdk"
    if (Test-Path "$EmsdkPath\emsdk_env.ps1") {
        Write-Host "==> Emscripten not found in PATH. Activating from $EmsdkPath..." -ForegroundColor Yellow
        & "$EmsdkPath\emsdk_env.ps1"
    } else {
        Write-Error "Emscripten (emcc) not found and could not be auto-activated. Please run emsdk_env.ps1 manually."
        return
    }
}

Write-Host "==> Compiling TreeCraft C++ to WebAssembly (PowerShell)..." -ForegroundColor Cyan

# Define source files
$Sources = @(
    (Join-Path $CppDir "tree_interface.cpp"),
    (Join-Path $CppDir "binary_tree.cpp"),
    (Join-Path $CppDir "bst.cpp"),
    (Join-Path $CppDir "avl.cpp")
)

# Run emcc
# Using @Sources (splatting) ensures each array element is passed as a separate argument
& emcc -O2 `
    @Sources `
    -o (Join-Path $OutputDir "tree.js") `
    -s WASM=1 `
    -s MODULARIZE=1 `
    -s EXPORT_NAME="TreeModule" `
    -s "EXPORTED_FUNCTIONS=['_init_tree','_insert_value','_delete_value','_search_value','_export_tree_json','_reset_tree','_get_traversal','_insert_word','_delete_word','_search_word','_get_current_tree_type','_is_tree_implemented']" `
    -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap','UTF8ToString','stringToUTF8','lengthBytesUTF8']" `
    -s ALLOW_MEMORY_GROWTH=1 `
    -s TOTAL_MEMORY=16777216

Write-Host "==> Build complete!" -ForegroundColor Green
Write-Host "    Output: $OutputDir\tree.js"
Write-Host "           $OutputDir\tree.wasm"
