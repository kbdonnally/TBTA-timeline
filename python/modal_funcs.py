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

def makeObjects(entryids, itemids):
	objectlist = [[entryid, itemid] for entryid, itemid in zip(entryids, itemids)]
	return objectlist

# grab image info and match with filenames
def imageInfo(csvfile):

	import csv

	with open(csvfile, newline='') as f:
		readCSV = csv.reader(f, delimiter=',')
		ids = [] # row # in SQL sheet (1-indexed)
		item_ids = [] # == itemids
		filenames = [] # 193081jlkjfsdjfoi.jpg, etc
		for row in readCSV:
			id = row[0]
			item_id = row[1]
			filename = row[2]

			ids.append(id)
			item_ids.append(item_id)
			filenames.append(filename)
			
	return [ids, item_ids, filenames]

def itemsWithFilenames(item_ids, filenames):
	idswithfiles = [[id, filename] for id, filename in zip(item_ids, filenames)]
	return idswithfiles

def matchItemsWithFiles(entryids, itemids, idswithfiles):
	filematches = []
	for i, [item, filename] in enumerate(idswithfiles):
		if item in itemids:
			i = itemids.index(item)
			filematches.append([str(entryids[i]), item, filename])
		else:
			continue
	return filematches

def normalizeFiles(filematches):
	normalized = []
	for [entryid, itemid, filename] in filematches:
		jpg = filename.split('.', maxsplit=1)
		normalized.append([entryid, itemid, jpg[0] + '.jpg'])
	return normalized

def make112(filematches, itemids):
	new = []
	files = []
	matches = []
	for i, [entryid, itemid, filename] in enumerate(filematches):
		new.append(itemid)
		files.append(filename)
	for i, itemid in enumerate(itemids):
		if itemid in new:
			matches.append(files[new.index(itemid)])
		else:
			matches.append('none')
	return matches


