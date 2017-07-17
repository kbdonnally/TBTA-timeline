# dot-funcs.py
# NB: if no entry in given vector, has been replaced with 'none' or 0, depending on context

###############################################################

import funcs

# copied from csv_commands:

# below: denote odd or even entry # so large screens know which way to align
# *56 b/c len(entries) = 112
oddeven = ['odd', 'even'] * 56
# below: numbers entries for comments
entries = ['e' + str(i) for i in range(1,113)]
# print(entries)

# below: create matrix of variables from raw csv
# e = [years, months, days, titles, texts, sources, unedited_stuff]
elements = funcs.rowsToVars('parse.csv')

# below: vector = years
years = funcs.elemYears(elements)

# below: vectors = months as 1-12, months as names
monthnumbers = funcs.elemMonths(elements)
months = funcs.monthsNumsToNames(monthnumbers)

# below: vectors = days as 1-31, days as 1st-31st
days = funcs.elemDays(elements)
ordinaldays = funcs.formatDays(days)

titles = funcs.elemTitles(elements)
texts = funcs.elemTexts(elements)
sources = funcs.elemSources(elements)

# below: assigns icon img title and alt text based on entry's source
picnames = funcs.createPicNames(sources)
picalts = funcs.createPicAlts(picnames)

#################################################


yearints = [int(y) for y in years]       	# '0000' --> 0000 (len 112)
allyears = [y for y in range(1819,2018)] 	# list 1819-2017 (len 199)

def overlapYears(years):
	from collections import Counter	
	yearCounter = Counter(yearints)          	# counter obj, ~= dict (len 43)
	usedyears = list(yearCounter)				# years with 1+ entry (len 43)
	yeardict = dict(yearCounter)				# dict {key=used year, val=#}

	finalfreq = []

	for i in allyears:
		if i in yeardict:
			finalfreq.append((i, yeardict[i]))  # if year has entry, add tuple 
												# tuple: (year, # entries)
		else:
			finalfreq.append((i, 0))			# otherwise, add (year, 0)
	return finalfreq							# returns list (len 45)

#def sourcesToDivs(?):


divtest = '''
<div> <!--{0}-->
	<p class="{1}"></p>
}
</div>
'''
divs2 = divtest*2


def sourcesToNums(sources):
	nums = []
	for s in sources:
		if s == 'Federal response':
			nums.append(3)
		elif s == 'Student response':
			nums.append(2)
		else:
			nums.append(1)
	return nums

# nums = sourcesToNums(sources)
# yearnums = [(y, n) for y, n in zip(yearints, nums)]

def makeDefaultDict(yearnums):
	from collections import defaultdict
	d = defaultdict(list)
	for key, value in yearnums:
		d[key].append(value)
	return sorted(d.items())

# below: templates for dots; x = code #, 0 = year
def makeGrafs(numsonly):
	p = [0] * 199
	div = '''<div><p class="{1}"></p></div> <!--{0}-->
'''
	for i in range(0, 199):
		if numsonly[i] == 0:
			p[i] = '''<div><p class="{1}"></p></div> <!--{0}-->
'''
		elif numsonly[i] >= 1:
			p[i] = div * numsonly[i]
		else:
			p[i] = 'ERROR!'
	return p

# below: make codes in list len 199 incl 0 entry years
def returnCodes(codesonly, numsonly):
	copynums = numsonly
	new = [] # [n if (n == 0) else c for c in codesonly for n in copynums]
	counter = 0
	for n in copynums:
		if n == 0:
			new.append(n)
		else:
			new.append(codesonly[counter])
			counter += 1
	return new

# found online, need to figure out more about how works:
def flatten(l):
	import collections
	for el in l:
		if isinstance(el, collections.Iterable) and not isinstance(el, (str, bytes)):
			yield from flatten(el)
		else:
			yield el
	return l

def codesToClasses(flattened):
	classes = []
	for f in flattened:
		if f == 0:
			classes.append('none')
		elif f == 1:
			classes.append('admin')
		elif f == 2:
			classes.append('student')
		elif f == 3:
			classes.append('fed')
		else:
			classes.append('ERROR!')
	return classes

# below: fills in <p>
def makeParas(dataforparas):
	paras = []
	for i, (h, c) in enumerate(dataforparas):
		p = ' <a href="#' + str(h) + '" class="' + c + '"></a>' # changing to <a> from <p>, adding href="#{0}"
		paras.append(p)
	return paras

# below: len 268, all yrs # times appear
def hopefulYears(yearfreq):
	moreyears = []
	for i, (y, n) in enumerate(yearfreq):
		if (n == 0) or (n == 1):
			moreyears.append(y)
		elif (n > 1):
			for i in range(n):
				moreyears.append(y)
	return moreyears

# below: len 268, mixed int/str list of id names accounting for >1 entry in yr
def yearsForIds(yearfreq):
	moreyears = []
	for i, (y, n) in enumerate(yearfreq):
		if (n == 0):
			moreyears.append(0)
		elif (n == 1):
			moreyears.append(y)
		elif (n > 1):
			for i in range(n):
				moreyears.append(str(y)+'-'+str(i+1))
	return moreyears


def fullDivs(fullyears, paradots):
	mystring = '''<div> <!--1819-->
'''
	counter = 1819
	for i, year in enumerate(fullyears):
		if year == counter:
			mystring += paradots[i] + '\n'
		else:
			mystring += '''\n</div>
<div> <!--''' + str(year) + '''-->
''' + paradots[i]
			counter += 1
	return mystring + '</div>'

