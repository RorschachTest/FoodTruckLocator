import json

f = open("data.json", "r")
data = f.read()
f.close()

json_data = json.loads(data)
all_columns = json_data["meta"]["view"]["columns"]

# 22 -> lattitude 23 - longitude

curated_data = []
for a in json_data["data"]:
    tmp = {}
    for i in range(0, len(a)):
        tmp[all_columns[i]["name"]] = a[i]
        tmp["loc"] = {
            "type": "Point",
            "coordinates": [float(a[23]), float(a[22])]
        }
    curated_data.append(tmp)

f = open("output.json", "w")
f.write(json.dumps(curated_data))
f.close()
