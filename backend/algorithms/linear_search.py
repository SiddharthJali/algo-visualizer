from typing import List

def linear_search(arr: List[int], target: int):
    steps = []  # Stores steps for visualization

    for index, num in enumerate(arr):
        steps.append({"index": index, "value": num, "is_match": num == target})

        if num == target:
            return {"found": True, "index": index, "steps": steps}

    return {"found": False, "index": -1, "steps": steps}
