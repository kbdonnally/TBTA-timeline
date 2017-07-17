# testing.py

import funcs, dot_funcs

# range 1819-2017, i = (year, # entries)
yearfreq = dot_funcs.overlapYears(dot_funcs.years) # len 199
# source category: 1, 2, 3
categs = dot_funcs.sourcesToNums(dot_funcs.sources) # len 112
# years, 1/2/3
yearnums = [(y, n) for y, n in zip(dot_funcs.yearints, categs)] # len 112
# len 43, i = (year, [code, #s, of, sources])
numcodes = dot_funcs.makeDefaultDict(yearnums) # len 43
# source category: 1, 2, 3
codesonly = [c for (y, c) in numcodes] # len 43
# frequency: 0-14ish

numsonly = [n for (y, n) in yearfreq] # len 199

# divs w/ 0 = year, 1, 2, 3 = category
divs = dot_funcs.makeGrafs(numsonly) # len 199

longcodes = dot_funcs.returnCodes(codesonly, numsonly) # len 199, mixed list
	
flattened = [x for x in dot_funcs.flatten(longcodes)] # len 268, flat list

classes = dot_funcs.codesToClasses(flattened) # len 268, classes in words

allyears = [y for y in range(1819,2018)]      # len 199

paradots = dot_funcs.makeParas(classes) # len 268, <p> w/ classes filled in

fullyears = dot_funcs.hopefulYears(yearfreq) # len 268, all yrs # times appear

hreflist = dot_funcs.yearsForIds(yearfreq) # len 268, hrefs for entries; if yr =/= appear, ==0

idlist = [h for h in hreflist if h != 0] # len 112, removes yrs w/o entry so can add ids to original divs
print(idlist, len(idlist))

# below: trying to format with {0}
def fillInIds(paradots):
	withids = ''
	for t in range(50):
		withids += paradots[t].format(allyears[t])
	return withids

dotswithids = fillInIds(paradots)


finaldots = dot_funcs.fullDivs(fullyears, paradots)


#funcs.strToHTMLDoc('autofilled-dots-2', finaldots)
#print(finaldots)