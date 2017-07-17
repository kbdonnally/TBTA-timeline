# dot_commands.py

import funcs, dot_funcs

# yearfreq: len 199, 1819-2017, i = (year, # entries)
yearfreq = dot_funcs.overlapYears(dot_funcs.years)
nums = dot_funcs.sourcesToNums(dot_funcs.sources)
yearnums = [(y, n) for y, n in zip(dot_funcs.yearints, nums)]


# len 43, i = (year, [code, #s, of, sources])
numcodes = dot_funcs.makeDefaultDict(yearnums)
codesonly = [c for (y, c) in numcodes]
print(codesonly, len(codesonly))
# yearsonly = dot_funcs.allyears

# nums = frequencies, here; above = source category
numsonly = [n for (y, n) in yearfreq]

templatedivs = dot_funcs.makeGrafs(numsonly)

########### abandoning ship for testing.py!!!!!!!!!!! ############

