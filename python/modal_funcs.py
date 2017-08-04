# modal_funcs.py

# below: read hyperlinks into list
def itemURLs(csvfile):

	import csv

	with open(csvfile, newline='') as f:
		readCSV = csv.reader(f, delimiter=',')
		urls = []
		for row in readCSV:
			url = row[1]
			if url == '':
				urls.append('none')
			else:
				urls.append(url)
	return urls

# below: testing DictReader ***TRASH THIS BUT CODE SALVEAGABLE***
def dictTest(csvfile):

	import csv
	import json

	with open(csvfile, newline='') as f:
		jsonfile = open('file1.json', 'w')
		fieldnames = ("title", "url")
		reader = csv.DictReader(f, fieldnames)
		for row in reader:
			json.dump(row, jsonfile) # nb: this means new JSON object for each row?
			# yes - see this to convert data: 
			# https://stackoverflow.com/questions/8959027/simplejson-dumpsdict-throws-not-json-serializable
			jsonfile.write('\n')

def splitURLs(urls):
	itemids = []
	for i, url in enumerate(urls):
		if url == 'none':
			itemids.append(url)
		else:
			spliturl = url.rsplit('/', maxsplit=1)
			itemids.append(spliturl[1])
	return itemids

# very helpful for below:
# https://stackoverflow.com/questions/25348640/two-lists-to-json-format-in-python

def makeObjects(entryids, itemids, urls):
	objectlist = [{"entryid": entryid, "itemid": itemid, "url": url} for entryid, itemid, url in zip(entryids, itemids, urls)]
	return objectlist