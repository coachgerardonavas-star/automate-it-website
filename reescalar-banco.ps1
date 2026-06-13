# reescalar-banco.ps1
# Reescala a un tamaño exacto todos los PNG de una carpeta usando System.Drawing
# (GDI+ de Windows, sin dependencias npm). Idempotente: salta los que ya están OK.
# Lo invoca generar-banco.js al terminar, pero también se puede correr solo:
#   powershell -ExecutionPolicy Bypass -File .\reescalar-banco.ps1 -Width 1080 -Height 1920

param(
  [int]$Width  = 1080,
  [int]$Height = 1920,
  [string]$Dir = (Join-Path $PSScriptRoot 'banco')
)

Add-Type -AssemblyName System.Drawing

$pngs = Get-ChildItem -Path $Dir -Filter '*.png' -File -ErrorAction SilentlyContinue
if (-not $pngs) { Write-Output "No hay PNGs en $Dir"; exit 0 }

$cambiadas = 0
foreach ($f in $pngs) {
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  $w = $img.Width; $h = $img.Height
  if ($w -eq $Width -and $h -eq $Height) { $img.Dispose(); continue }  # ya está OK

  $bmp = New-Object System.Drawing.Bitmap($Width, $Height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($img, 0, 0, $Width, $Height)
  $g.Dispose(); $img.Dispose()

  $tmp = "$($f.FullName).tmp.png"
  $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Remove-Item $f.FullName -Force; Rename-Item $tmp $f.FullName
  Write-Output ("  reescalada: {0}  ({1}x{2} -> {3}x{4})" -f $f.Name, $w, $h, $Width, $Height)
  $cambiadas++
}
Write-Output ("Reescalado: {0} ajustada(s), {1} ya estaban en {2}x{3}." -f $cambiadas, ($pngs.Count - $cambiadas), $Width, $Height)
