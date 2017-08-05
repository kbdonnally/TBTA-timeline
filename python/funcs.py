# csv-function.py
# functions behind execution of csv-commands.py file

# below: turns raw csv file into defined variables (vars = lists)
# NB: this is probably not the most efficient way, but it worked

def rowsToVars(csvfile):
	# csv-to-html.py
	# tutorial source: https://pythonprogramming.net/reading-csv-files-python-3/

	import csv

	with open(csvfile, newline = '') as f:
	    readCSV = csv.reader(f, delimiter=',')
	    years = []
	    months = []
	    days = []
	    titles = []
	    texts = []
	    notes = []
	    sources = []
	    for row in readCSV: # this could be done better with DictReader
	        year = row[0]
	        month = row[1]
	        day = row[2]
	        title = row[3]
	        text = row[4]
	        note = row[5] # mislabeled, corrected below
	        source = row[6] # sources are actually row 5

	        years.append(year)
	        months.append(month)
	        days.append(day)
	        titles.append(title)
	        texts.append(text)
	        notes.append(note)
	        sources.append(source)
	elements = [years, months, days, titles, texts, notes, sources]
	return elements

# below: return individual vectors

def elemYears(elements):
	return elements[0]

def elemMonths(elements):
	return elements[1]

def elemDays(elements):
	return elements[2]

def elemTitles(elements):
	return elements[3]

def elemTexts(elements):
	return elements[4]

def elemSources(elements):
	return elements[5]
# print(rowsToVars('parse.csv'))

# below: turn month numbers into integers into month names; if none given originally, changed to 0 in csv and give value 'none'

def monthsNumsToNames(months):
	import calendar
	monthnums = [int(m) for m in months]
	monthnames = []
	for m in monthnums:
		if m == 0:
			monthnames.append('none')
		else:
			month = calendar.month_name[m]
			monthnames.append(month)
	return monthnames

def formatDays(days):
	daynums = [int(d) for d in days]
	ordinal = []
	for d in daynums:
		if 4 <= d <= 20:
			ordinal.append(str(d) + 'th')
		elif d == 1 or (d % 10) == 1:
			ordinal.append(str(d) + 'st')
		elif d == 2 or (d % 10) == 2:
			ordinal.append(str(d) + 'nd')
		elif d == 3 or (d % 10) == 3:
			ordinal.append(str(d) + 'rd')
		else:
			ordinal.append('none')
	return ordinal

# below: names of png files for icons
def createPicNames(sources):
	picnames = []
	for s in sources:
		if s == 'Federal response':
			picnames.append('govt')
		elif s == 'Student response':
			picnames.append('students')
		else:
			picnames.append('rotunda')
	return picnames

# below: alt text for icons
def createPicAlts(picnames):
	picalts = []
	for p in picnames:
		if p == 'govt':
			picalts.append('government')
		elif p == 'students':
			picalts.append('students')
		else:
			picalts.append('Rotunda')
	return picalts

# below: html template for 1 entry in the timeline
# 'madlibslist' = list of 112 templates
# 7/17: added "id='14'" in template
# 8/4: added "data-item-number='15'" in template
# 8/5: added "data-jpg='16'" in template
template = '''
<!--start {0} -->
<div class="tl-wrapper timeline">
  <div class="icon">
    <img src="img/{1}.png" alt="{2}">
  </div>
</div>
    <div class="entry {3}" id="{14}" data-item-number="{15}" data-jpg="{16}">
      <h2>{4}</h2>
      <h3>{5}, {6} {7}, {8}</h3>
      <p>{9}</p>
    </div>

<div class="date {10}">{11} {12}</div>
<!-- end {13} -->
'''

madlibslist = [template] * 112


# --------- KEY: ----------
# 0 entries, 1 picnames, 2 picalts, 3 oddeven, 4 titles, 5 sources, 6 months, 
# 7 ordinaldays, 8 years, 9 texts, 10 oddeven, 11 months, 12 years, 13 entries
# -------------------------

def strToHTMLDoc(title, sourcetext):
	import webbrowser, os
	filename = title + '.html'
	f = open(filename, 'ab')
	header = '''<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title>Admin Timeline Entries</title>
	</head>
	<body>

	'''
	footer = '''

	</body>
	</html>'''
	f.write(header.encode('utf-8'))
	f.write(sourcetext.encode('utf-8'))
	f.write(footer.encode('utf-8'))
	f.close()

	webbrowser.open('file://' + os.path.realpath(filename))