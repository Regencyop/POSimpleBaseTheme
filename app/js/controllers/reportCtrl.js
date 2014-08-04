four51.app.controller('ReportCtrl', ['$scope', '$routeParams', '$451', 'Report',
function($scope, $routeParams, $451, Report) {
	$scope.displayLoadingIndicator = true;
	$scope.actionMessage = null;
	$scope.errorMessage = null;
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

	Report.get($routeParams.id,
		function(data) {
			$scope.report = data;
			$scope.displayLoadingIndicator = false;
		},
		function(ex) {
			$scope.actionMessage = ex.Message;
			$scope.displayLoadingIndicator = false;
		}
	);

	$scope.saveReport = function() {
		$scope.errorMessage = null;
		$scope.displayLoadingIndicator = true;
		$scope.actionMessage = null;
		Report.save($scope.report,
			function(report) {
				$scope.report = report;
				$scope.actionMessage = "Your changes have been saved.";
				$scope.displayLoadingIndicator = false;
			},
			function(ex) {
				$scope.errorMessage = ex.Message;
				$scope.displayLoadingIndicator = false;
			}
		);
	};

	function Download() {
		$scope.errorMessage = null;
		$scope.actionMessage = null;
		$scope.displayLoadingIndicator = true;
		$scope.settings.listCount = 0;
		Report.download($scope.report.ID,
			function(data, count) {
				$scope.report = data;
				$scope.settings.listCount = count;
				$scope.displayLoadingIndicator = false;
			},
			function(ex) {
				$scope.errorMessage = ex.Message;
				$scope.displayLoadingIndicator = false;
			},
			$scope.settings.currentPage, $scope.settings.pageSize
		);
	}
	$scope.downloadReport = function() {
		Report.clear();
		Download();
	};

	$scope.$watch('settings.currentPage', function(n,o) {
		if ($scope.report)
			Download();
	});

	$scope.getDownload = function() {
		window.location = $scope.report.DownloadUrl;
	}
}]);