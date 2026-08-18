import os, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
h = open('lightweight-charts.js', encoding='utf-8', errors='ignore').read()
print('v5 size:', os.path.getsize('lightweight-charts.js'))
print('has CandlestickSeries:', 'CandlestickSeries' in h)
print('has addSeries:', 'addSeries' in h)
print('has createSeriesMarkers:', 'createSeriesMarkers' in h)

p = open('lwc-drawing-tools.umd.js', encoding='utf-8', errors='ignore').read()
print('---')
print('plugin size:', os.path.getsize('lwc-drawing-tools.umd.js'))
for kw in ['require', 'LightweightCharts', 'DrawingPlugin', 'globalThis']:
    print(repr(kw), '->', p.find(kw))
print('--- UMD head ---')
print(p[:500].encode('ascii', 'replace').decode())
