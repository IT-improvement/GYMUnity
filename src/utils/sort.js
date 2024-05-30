const Sort = {
    ObjectArrayInDescOrder: function(objArr, sortField) {
        const sortedArr = [...objArr];

        sortedArr.sort((first, second) => (first[sortField] < second[sortField]) ? 1 : -1);

        return sortedArr;
    },
    ObjectArrayInAsecOrder: function(objArr, sortField) {
        const sortedArr = [...objArr];

        sortedArr.sort((first, second) => (first[sortField] > second[sortField]) ? 1 : -1);

        return sortedArr;
    },
};

export default Sort;