import React from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "./styles.scss";
import "react-dropdown-tree-select/dist/styles.css";

function DropdownTreeSelectUI(props) {
  const { data,onChange } = props;
  const handleChange = (currentNode, selectedNodes) => {

    console.log(currentNode?.id)
    onChange(currentNode?.id);
     
  };
  const assignObjectPaths = (obj, stack) => {
    Object.keys(obj).forEach((k) => {
      const node = obj[k];
      if (typeof node === "object") {
        node.path = stack ? `${stack}.${k}` : k;
        assignObjectPaths(node, node.path);
      }
    });
  };

  return (
    <DropdownTreeSelect
      data={data}
      onChange={handleChange}
      className="rc-dropdown-tree-select"
      mode="radioSelect"
      keepTreeOnSearch={true}
      texts={{
        placeholder: "Nhập để tìm kiếm",
        noMatches: "Không có kết quả phù hợp",
      }}
    />
  );
}

export default DropdownTreeSelectUI;
