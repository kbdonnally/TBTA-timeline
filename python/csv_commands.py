# csv-commands.py
# NB: if no entry in given vector, has been replaced with 'none' or 0, depending on context

import funcs

# below: denote odd or even entry # so large screens know which way to align
# *56 b/c len(entries) = 112
oddeven = ['odd', 'even'] * 56
# below: numbers entries for comments
entries = ['e' + str(i) for i in range(1,113)]
# print(entries)

# below: create matrix of variables from raw csv
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
# print(titles)

def fillInTemplates(madlibslist):
	newsents = ''
	for t in range(112):
		newsents += madlibslist[t].format(entries[t], picnames[t], picalts[t], oddeven[t], titles[t], sources[t], months[t], ordinaldays[t], years[t], texts[t], oddeven[t], months[t], years[t], entries[t])
	return newsents


filledentries = fillInTemplates(funcs.madlibslist)

funcs.strToHTMLDoc('autofilled-entries-1', filledentries)


# --------- KEY: ----------
# 0 entries, 1 picnames, 2 picalts, 3 oddeven, 4 titles, 5 sources, 6 months, 
# 7 days, 8 years, 9 texts, 10 oddeven, 11 months, 12 years, 13 entries
# -------------------------
