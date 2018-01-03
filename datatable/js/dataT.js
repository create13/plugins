	function dataList(){
											 table.clear().draw();
		                                    for ( var cot = 0; cot < 6; cot++) {
		                                         var row_data = {
		                                                "id":"1",
		                                                "status":"运行",
		                                                "speed":"1000转/分钟",
		                                                "traffic":"1000立方米/分钟",
		                                                "pressure":"1000~3000Pa",
		                                                "power":"100kw"
		                                              }

		                                        table.row.add(row_data).draw().node();
		                                    }

		                                 
		                              	};
		                              			                    				
		                                    
		                                    var table = $("#searchTable").DataTable({
		                                		searching:false,
		                                		info:true,
		                                		bPaginate:true,
		                                		aLengthMenu:[[5,10,15,20,-1],["5条","10条","15条","20条","全部"]],
		                                		sPaginationType: "bootstrap",
		                                		columns:[
		                                		{data:"id"},
		                                		{data:"status"},
		                                		{data:"speed"},
		                                		{data:"traffic"},
		                                		{data:"pressure"},
		                                		{data:"power"}
		                                		],
		                                		oLanguage:{
		                                			sLengthMenu:"展示 _MENU_ 数据",
		                                			sZeroRecords: "对不起，查询不到任何相关数据",
		                            	    		sInfo:"当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
		                            	    		sInfoEmpty: "显示第 0 至 0 条记录，共 0条",
		                            	    		sProcessing: "正在载入数据...",
		                            	    		oPaginate:{
		                            	    			"sFirst":    "第一页",
		                            			        "sPrevious": " 上一页 ",
		                            			        "sNext":     " 下一页 ",
		                            			        "sLast":     " 最后一页 "
		                            	    		}
		                                		},
		                                		pagingType: "full_numbers"//分页样式的类型
		                                	});	             
		                          